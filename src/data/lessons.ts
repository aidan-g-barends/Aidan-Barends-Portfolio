import {
  ArrowUpFromLine,
  Hourglass,
  MessagesSquare,
  Timer,
  UserCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Lesson = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// What working with real clients (field work, remote support and
// freelancing) has taught me. The first three are shown on the About page.
export const lessons: Lesson[] = [
  {
    icon: MessagesSquare,
    title: "Communicating with real clients",
    description:
      "Clients want to know what's wrong, what I'm doing about it, and when it'll be sorted. I've learnt to explain technical problems clearly, without the jargon, and to keep people in the loop.",
  },
  {
    icon: Hourglass,
    title: "Patience",
    description:
      "When someone's internet is down or they can't get into their email, they're usually stressed. Staying calm and patient, and walking them through it step by step, makes the fix go a lot smoother.",
  },
  {
    icon: Users,
    title: "Every client is different",
    description:
      "Homes and businesses need different things, and so do people who are confident with tech and people who aren't. I've learnt to read the person in front of me and adjust how I work with them.",
  },
  {
    icon: Timer,
    title: "Staying calm under pressure",
    description:
      "A network outage at a business costs them money every minute. Diagnosing the problem fast without panicking is something you only really learn on the job.",
  },
  {
    icon: ArrowUpFromLine,
    title: "Knowing when to escalate",
    description:
      "With remote support I don't always have admin access, so I handle the troubleshooting I can and hand the rest over properly, rather than leaving a client stuck.",
  },
  {
    icon: UserCheck,
    title: "Owning the job",
    description:
      "Whether I'm on-site alone or building a client's website start to finish, the work is mine. That means following through until it's actually done.",
  },
];
