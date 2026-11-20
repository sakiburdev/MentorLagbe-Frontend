import { LuQuote, LuStar } from "react-icons/lu";
import FadeIn from "@/components/shared/FadeIn";
import SectionHeading from "@/components/shared/SectionHeading";

const reviews = [
  {
    name: "Sabbir Hossain",
    role: "HSC Student",
    text: "I found a Physics tutor within a day. Applying was easy and the tutor replied the same evening.",
  },
  {
    name: "Nusrat Jahan",
    role: "Math Tutor",
    text: "Posting my batch took two minutes. Managing applicants from one dashboard saves me so much time.",
  },
  {
    name: "Mim Chowdhury",
    role: "IELTS Student",
    text: "The filters helped me find an online IELTS mentor within my budget. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading tag="Testimonials" title="Loved by Students and Tutors" />

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review, index) => (
          <FadeIn key={review.name} delay={index * 0.1} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border bg-card p-6">
              <LuQuote className="h-8 w-8 text-primary/30" />
              <p className="mt-3 flex-1 text-sm text-muted-foreground">
                {review.text}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                  {review.name.charAt(0)}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
                <span className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <LuStar
                      key={star}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
export default Testimonials;
