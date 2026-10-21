import type { ClientReview } from "./types";

export const reviewsSource = {
  name: "Fiverr",
  profileUrl: "https://www.fiverr.com/users/ahmadhussain1",
};

/**
 * Verbatim reviews from the public Fiverr profile (captured Oct 2026; years are
 * approximate). Client avatars are intentionally not reproduced.
 */
export const featuredReview: ClientReview = {
  author: "akmol_mridha",
  country: "Singapore",
  rating: 5,
  year: "2025",
  quote:
    "I’m very happy with the Android app this seller created for me! The design is clean, smooth, and works perfectly on all devices. They understood my requirements clearly, communicated well throughout the project, and delivered on time. Excellent experience — highly recommended for anyone looking for professional Android app development!",
};

export const reviews: ClientReview[] = [
  {
    author: "mari099",
    country: "Costa Rica",
    rating: 5,
    year: "2019",
    quote:
      "He is a great developer. Hope to keep working in future. Always was there to help me in the process of running the code and making the configurations for a long time even when he had no responsability to do it. Thank you very much",
  },
  {
    author: "user08896741",
    country: "Russia",
    rating: 5,
    year: "2019",
    quote:
      "this is the third time which is i work with him. i am happy with work and i have good experince to work. he is very kind and responsible and delivery all time very fast. thanks",
  },
  {
    author: "ridahattouma",
    country: "Belgium",
    rating: 5,
    year: "2020",
    quote: "This is the second time I'm working with him and I'm always happy of his work. I really recommand this developer for all of your projects!!",
  },
  {
    author: "raphaelaloi",
    country: "Brazil",
    rating: 5,
    year: "2020",
    quote: "Amazing work. Great communication, defintely will hire him again.",
  },
  {
    author: "jai21kumar",
    country: "India",
    rating: 5,
    year: "2020",
    quote: "Very Good work Done . Excellent Knowledge of work. Completed Job in time.",
  },
  {
    author: "sahib007",
    country: "United Arab Emirates",
    rating: 5,
    year: "2025",
    quote: "very professional work and positive response",
  },
  {
    author: "appinvents",
    country: "Sri Lanka",
    rating: 5,
    year: "2019",
    quote: "Excellent seller. Very commited. Work with him again",
  },
  {
    author: "ridahattouma",
    country: "Belgium",
    rating: 5,
    year: "2020",
    quote: "He helped me with my project and i'm really satisfied of his work. thank you!!",
  },
  {
    author: "user77847225",
    country: "India",
    rating: 5,
    year: "2020",
    quote: "Very sincere. Will hire you again.",
  },
  {
    author: "abdulahsalem",
    country: "Pakistan",
    rating: 5,
    year: "2018",
    quote: "Awesome work as expected..",
  },
  {
    author: "nimapasta",
    country: "Bulgaria",
    rating: 5,
    year: "2020",
    quote: "fast and nice",
  },
];

export const allReviews = [featuredReview, ...reviews];
