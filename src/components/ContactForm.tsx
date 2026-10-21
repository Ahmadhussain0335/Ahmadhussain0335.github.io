"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon, SendIcon } from "lucide-react";
import { site } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "submitting" | "success" | "error";
type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "Please enter a valid email address.";
  if (fields.message.trim().length < 10) errors.message = "Please write a message of at least 10 characters.";
  return errors;
}

function mailtoHref({ name, email, message }: Fields) {
  const subject = `Portfolio contact from ${name}`;
  const body = `${message}\n\n${name} (${email})`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputClasses =
  "mt-2 block w-full rounded-lg border border-border bg-card px-3.5 py-3 text-base text-foreground placeholder:text-stronger transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft aria-[invalid=true]:border-red-400";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;

    const fields: Fields = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`);
      firstInvalid?.focus();
      return;
    }

    if (!formspreeId) {
      window.location.href = mailtoHref(fields);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center rounded-2xl border border-border bg-card p-8">
        <span className="grid size-10 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
          <CheckIcon aria-hidden="true" className="size-5" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-foreground">Message sent</h3>
        <p className="mt-2 text-muted">Thank you. I&apos;ll reply by email.</p>
        <button type="button" onClick={() => setStatus("idle")} className={`${buttonClasses("secondary")} mt-6`}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8" aria-describedby="contact-form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-foreground">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClasses}
          />
          {errors.name ? <p id="contact-name-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-foreground">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClasses}
          />
          {errors.email ? <p id="contact-email-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p> : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClasses} resize-y`}
        />
        {errors.message ? <p id="contact-message-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.message}</p> : null}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="text-sm text-subtle">
          {formspreeId ? "Your message is delivered by email." : "This opens your email app with the message prefilled."}
        </p>
        <button type="submit" data-magnetic="" disabled={status === "submitting"} className={`${buttonClasses("primary")} disabled:cursor-not-allowed disabled:opacity-60`}>
          <SendIcon aria-hidden="true" className="size-4" />
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          The message could not be sent. Please try again, or email me directly at{" "}
          <a href={`mailto:${site.email}`} className="font-medium underline">{site.email}</a>.
        </p>
      ) : null}
    </form>
  );
}
