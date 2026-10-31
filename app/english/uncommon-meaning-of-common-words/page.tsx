import type { Metadata } from "next";
import { QuestionCard } from "@/components/QuestionCard";

export const metadata: Metadata = {
  title: "Uncommon meaning of common words | Bumblebee",
  description: "Explore uncommon meanings of inform, constitution, duck, clinic, and resign through sentence-based meaning questions.",
  alternates: { canonical: "https://bumblebee.work/english/uncommon-meaning-of-common-words" }
};

/**
 * Practices uncommon meanings with question-specific choices rather than fixed word pairs.
 *
 * Example: the inform question reveals its guide/influence meaning only after an answer is selected.
 * A second question contrasts constitution (physical health and strength) with complexion (skin appearance).
 * Its post-answer explanation describes a strong or delicate constitution, without a separate Note.
 * The duck question describes lowering the head and body to pass beneath a low beam.
 * The clinic question retains the supplied goalkeeper sentence and asks for the meaning of "put on a clinic".
 * The resign question uses "She finally resigned herself to living alone" to distinguish acceptance from leaving a job.
 * Each QuestionCard manages its own selection without a section-specific wrapper.
 */
export default function UncommonMeaningsPage() {
  return (
    <main className="section-band">
      <h1 className="section-page-title">Uncommon meaning of common words</h1>
      <QuestionCard
        name="inform"
        layout="single"
        questions={[{
          sentence: "The research findings will ____ our decisions, helping us shape the policy around what residents actually need.",
          choices: ["inform", "announce"],
          answer: "inform",
          explanation: <>Here, <strong>inform</strong> means <strong>guide or influence through information</strong>, rather than simply &ldquo;tell someone something.&rdquo;</>
        }]}
      />
      <QuestionCard
        name="constitution"
        layout="single"
        questions={[{
          sentence: "Her robust ____ helps her resist illness and recover quickly from physical exhaustion.",
          choices: ["complexion", "constitution"],
          answer: "constitution",
          explanation: <>Here, <strong>constitution</strong> means <strong>a person&apos;s physical condition and natural strength</strong>, rather than a country&apos;s fundamental laws. Someone with a strong or robust constitution can withstand illness or physical hardship well; someone with a delicate constitution is more physically vulnerable. For example, &ldquo;Despite the harsh conditions, her strong constitution kept her healthy.&rdquo;</>
        }]}
      />
      <QuestionCard
        name="duck"
        layout="single"
        questions={[{
          sentence: "He had to ____ beneath the low beam, bending his knees and lowering his head to avoid hitting it.",
          choices: ["duck", "leap"],
          answer: "duck",
          explanation: <>As a verb, <strong>duck</strong> means to lower your head or body quickly to avoid being hit or seen, or to pass under something. Here, he lowers himself beneath the beam rather than leaping upward.</>
        }]}
      />
      <QuestionCard
        name="clinic"
        layout="single"
        questions={[{
          sentence: "The goalkeeper put on a clinic in the championship game. Here, “put on a clinic” means ____.",
          choicePrompt: "Choose the meaning of put on a clinic",
          choices: ["held a training session", "delivered an exceptional performance"],
          answer: "delivered an exceptional performance",
          explanation: <>In this sports expression, <strong>clinic</strong> refers to a demonstration of exceptional skill. The goalkeeper performed so well that the game could serve as a lesson in goalkeeping. <a href="https://www.merriam-webster.com/dictionary/clinic">Dictionary reference</a>.</>
        }]}
      />
      <QuestionCard
        name="resign"
        layout="single"
        questions={[{
          sentence: "She finally resigned herself to living alone. Here, “resigned herself to” means ____.",
          choicePrompt: "Choose the meaning of resigned herself to",
          choices: ["reluctantly accepted", "gave up her job"],
          answer: "reluctantly accepted",
          explanation: <>To <strong>resign oneself to</strong> something means to accept an unwanted situation because one believes it cannot be changed. Here, she came to accept living alone, although it was not what she wanted. <a href="https://www.merriam-webster.com/dictionary/resign%20oneself">Dictionary reference</a>.</>
        }]}
      />
    </main>
  );
}
