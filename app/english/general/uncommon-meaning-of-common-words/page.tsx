import type { Metadata } from "next";
import { QuestionCard } from "@/components/QuestionCard";

export const metadata: Metadata = {
  title: "Uncommon meaning of common words | Bumblebee",
  description: "Practice uncommon meanings of familiar English words, including inform meaning guide or shape and constitution meaning physical health and strength.",
  alternates: { canonical: "https://bumblebee.work/english/general/uncommon-meaning-of-common-words" }
};

/**
 * Practices uncommon meanings with question-specific choices rather than fixed word pairs.
 *
 * Example: the inform question reveals its guide/influence meaning only after an answer is selected.
 * A second question contrasts constitution (physical health and strength) with complexion (skin appearance).
 * Its post-answer explanation describes a strong or delicate constitution, without a separate Note.
 * The duck question describes lowering the head and body to pass beneath a low beam.
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
    </main>
  );
}
