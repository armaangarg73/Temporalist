import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { corsair } from "@/server/corsair";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const tenant = corsair.withTenant(userId);

 const [activities, briefs, emails, events, activityHistory, recentActivities] =
   await Promise.all([
     prisma.activity.count({
       where: { userId },
     }),

     prisma.executiveBrief.count({
       where: { userId },
     }),

     tenant.gmail.api.messages.list({
       userId: "me",
       maxResults: 20,
     }),

     tenant.googlecalendar.api.events.getMany({
       calendarId: "primary",
       maxResults: 20,
     }),

     prisma.activity.findMany({
       where: {
         userId,
       },
       orderBy: {
         createdAt: "asc",
       },
     }),

     prisma.activity.findMany({
       where: {
         userId,
       },
       orderBy: {
         createdAt: "desc",
       },
       take: 5,
     }),
   ]);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));

    return {
      key: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString("en-IN", {
        weekday: "short",
      }),
      count: 0,
    };
  });

  activityHistory.forEach((activity: any) => {
    const key = activity.createdAt.toISOString().slice(0, 10);

    const day = last7Days.find((d:any) => d.key === key);

    if (day) {
      day.count++;
    }
  });

  const productivityScore = Math.min(
    100,
    briefs * 10 +
      activities * 2 +
      (events.items?.length ?? 0) * 3 +
      Math.floor((emails.resultSizeEstimate ?? 0) / 20),
  );

  const dayCounts: Record<string, number> = {};

  activityHistory.forEach((activity: any) => {
    const day = activity.createdAt.toLocaleDateString("en-IN", {
      weekday: "long",
    });

    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });

  const busiestDay =
    Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "No activity";

 return Response.json({
   user: {
     name: session.user.name,
     email: session.user.email,
     image: session.user.image,
   },

   stats: {
     emails: emails.messages?.length ?? 0,
     meetings: events.items?.length ?? 0,
     activities,
     briefs,
   },

   chart: last7Days,

   insights: {
     productivityScore,
     busiestDay,
     latestActivity: recentActivities[0]?.title ?? "No activity",
   },
   recentActivities,
 });
}
