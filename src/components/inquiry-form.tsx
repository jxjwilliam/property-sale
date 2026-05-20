"use client";

import { useState, FormEvent } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocale } from "@/i18n/provider";
import { getDateFnsLocale } from "@/i18n/date-locale";

interface FormFields {
  name: string;
  email: string;
  phone: string;
  showingDate: Date | undefined;
  preferredTime: string;
  message: string;
}

const initialForm: FormFields = {
  name: "",
  email: "",
  phone: "",
  showingDate: undefined,
  preferredTime: "",
  message: "",
};

interface InquiryFormProps {
  id?: string;
}

export function InquiryForm({ id }: InquiryFormProps) {
  const { locale, messages } = useLocale();
  const t = messages.inquiry;
  const dateLocale = getDateFnsLocale(locale);

  const [form, setForm] = useState<FormFields>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update =
    (field: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.showingDate) return;
    setStatus("submitting");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        showingDate: format(form.showingDate, "yyyy-MM-dd"),
        preferredTime: form.preferredTime,
        message: form.message,
        locale,
      };
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-md border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  const labelClass = "block text-sm text-muted-foreground mb-1.5";

  const dateTriggerClass =
    "w-full flex items-center justify-between rounded-md border border-input bg-card px-4 py-2.5 text-sm text-foreground hover:border-primary transition-colors";

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-5">
      <div className="inquiry-form-grid grid grid-cols-1 gap-4">
        <div>
          <label className={labelClass}>{t.name}</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t.email}</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder={t.emailPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t.phone}</label>
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder={t.phonePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t.showingDate}</label>
          <Popover>
            <PopoverTrigger className={dateTriggerClass}>
              {form.showingDate
                ? format(form.showingDate, "PPP", { locale: dateLocale })
                : t.selectDate}
              <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-60" />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                required
                selected={form.showingDate}
                onSelect={(date) => setForm((prev) => ({ ...prev, showingDate: date }))}
                locale={dateLocale}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="inquiry-form-full">
          <label className={labelClass}>{t.preferredTime}</label>
          <select
            value={form.preferredTime}
            onChange={update("preferredTime")}
            className={inputClass}
          >
            <option value="">{t.timeAny}</option>
            <option value="Morning">{t.timeMorning}</option>
            <option value="Afternoon">{t.timeAfternoon}</option>
            <option value="Evening">{t.timeEvening}</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>{t.message}</label>
        <textarea
          rows={3}
          value={form.message}
          onChange={update("message")}
          placeholder={t.messagePlaceholder}
          className={inputClass + " resize-none"}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Button
          type="submit"
          disabled={status === "submitting" || !form.showingDate}
          className="bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
        >
          {status === "submitting" ? t.submitting : t.submit}
        </Button>
        {status === "success" && (
          <span className="text-sm text-accent">{t.success}</span>
        )}
        {status === "error" && (
          <span className="text-sm text-destructive">{t.error}</span>
        )}
      </div>
    </form>
  );
}
