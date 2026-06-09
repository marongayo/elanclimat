// components/admin-components/AdminJobsTab.tsx
"use client";

import { useState } from "react";
import {
  Plus,
  X,
  Save,
  Edit3,
  Trash2,
  Users,
  ChevronDown,
  ExternalLink,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import type { Job, JobForm, Applicant } from "@/lib/types/jobs";
import { INPUT_STYLE, LABEL_STYLE } from "./_adminStyles";

function getInlineCvUrl(url: string) {
  return `/api/jobs/cv?url=${encodeURIComponent(url)}`;
}

function JobCard({
  job,
  saving,
  onEdit,
  onDelete,
}: {
  job: Job;
  saving: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const applicants = job.applicants ?? [];

  return (
    <div style={{ background: "white", border: "1px solid var(--off-white)" }}>
      {/* Job header row */}
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontFamily: "DM Sans", fontSize: "0.92rem", fontWeight: 600, color: "var(--charcoal)" }}>
              {job.title}
            </span>
            <span
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                background: "var(--off-white)",
                color: "var(--text-muted)",
                padding: "2px 8px",
                borderRadius: 9999,
              }}
            >
              {job.type}
            </span>
          </div>
          <div style={{ fontFamily: "DM Sans", fontSize: "0.78rem", color: "var(--text-muted)" }}>
            {job.category} · {job.location}
          </div>
          {job.applicationDeadline && (
            <div
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.72rem",
                color: new Date(job.applicationDeadline) < new Date() ? "#c0392b" : "var(--text-muted)",
                marginTop: 4,
              }}
            >
              Deadline:{" "}
              {new Date(job.applicationDeadline).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              {new Date(job.applicationDeadline) < new Date() && " — Closed"}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "center" }}>
          <button
            onClick={() => setExpanded((e) => !e)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              background: applicants.length > 0 ? "var(--sage-pale)" : "var(--off-white)",
              border: "none",
              cursor: "pointer",
              fontFamily: "DM Sans",
              fontSize: "0.78rem",
              color: applicants.length > 0 ? "var(--sage-dark)" : "var(--text-muted)",
              borderRadius: 2,
            }}
          >
            <Users size={12} />
            {applicants.length} {applicants.length === 1 ? "applicant" : "applicants"}
            <ChevronDown
              size={12}
              style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            />
          </button>
          <button
            onClick={onEdit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              background: "none",
              border: "1px solid var(--off-white)",
              cursor: "pointer",
              fontFamily: "DM Sans",
              fontSize: "0.78rem",
              color: "var(--charcoal)",
            }}
          >
            <Edit3 size={12} /> Edit
          </button>
          <button
            onClick={onDelete}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              background: "none",
              border: "1px solid #fde8e8",
              cursor: "pointer",
              fontFamily: "DM Sans",
              fontSize: "0.78rem",
              color: "#c0392b",
            }}
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>

      {/* Applicants panel */}
      {expanded && (
        <div style={{ borderTop: "1px solid var(--off-white)", padding: "0 24px 24px" }}>
          {applicants.length === 0 ? (
            <p style={{ fontFamily: "DM Sans", fontSize: "0.82rem", color: "var(--text-muted)", paddingTop: 20, margin: 0 }}>
              No applications yet.
            </p>
          ) : (
            <div style={{ display: "grid", gap: 2, marginTop: 16 }}>
              {applicants.map((applicant, i) => (
                <div key={applicant._id ?? i}>
                  <div
                    onClick={() =>
                      setSelectedApplicant(selectedApplicant?._id === applicant._id ? null : applicant)
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 16px",
                      background: selectedApplicant?._id === applicant._id ? "var(--off-white)" : "#fafafa",
                      cursor: "pointer",
                      borderLeft: selectedApplicant?._id === applicant._id
                        ? "3px solid var(--sage-dark)"
                        : "3px solid transparent",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "var(--charcoal)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "white",
                        fontFamily: "DM Sans",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}
                    >
                      {applicant.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "DM Sans", fontSize: "0.86rem", fontWeight: 600, color: "var(--charcoal)" }}>
                        {applicant.fullName}
                      </div>
                      <div style={{ fontFamily: "DM Sans", fontSize: "0.74rem", color: "var(--text-muted)", marginTop: 2 }}>
                        {applicant.email}
                        {applicant.appliedAt && (
                          <span style={{ marginLeft: 10, color: "var(--dim)" }}>
                            ·{" "}
                            {new Date(applicant.appliedAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronDown
                      size={14}
                      style={{
                        color: "var(--text-muted)",
                        transform: selectedApplicant?._id === applicant._id ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {selectedApplicant?._id === applicant._id && (
                    <div
                      style={{
                        background: "white",
                        padding: "20px 24px",
                        borderLeft: "3px solid var(--sage-dark)",
                        display: "grid",
                        gap: 20,
                      }}
                    >
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                        <a
                          href={`mailto:${applicant.email}`}
                          style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "DM Sans", fontSize: "0.78rem", color: "var(--charcoal)", textDecoration: "none" }}
                        >
                          <Mail size={13} /> {applicant.email}
                        </a>
                        {applicant.phone && (
                          <a
                            href={`tel:${applicant.phone}`}
                            style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "DM Sans", fontSize: "0.78rem", color: "var(--charcoal)", textDecoration: "none" }}
                          >
                            <Phone size={13} /> {applicant.phone}
                          </a>
                        )}
                        {applicant.linkedin && (
                          <a
                            href={applicant.linkedin.startsWith("http") ? applicant.linkedin : `https://${applicant.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "DM Sans", fontSize: "0.78rem", color: "var(--charcoal)", textDecoration: "none" }}
                          >
                            <Briefcase size={13} /> LinkedIn
                          </a>
                        )}
                        <a
                          href={getInlineCvUrl(applicant.cvUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "DM Sans", fontSize: "0.78rem", color: "var(--sage-dark)", fontWeight: 600, textDecoration: "none", marginLeft: "auto" }}
                        >
                          <ExternalLink size={13} /> View CV
                        </a>
                      </div>
                      <div>
                        <div style={{ fontFamily: "DM Sans", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: 10 }}>
                          Cover Letter
                        </div>
                        <p style={{ fontFamily: "DM Sans", fontSize: "0.84rem", color: "var(--body)", lineHeight: 1.8, fontWeight: 300, margin: 0, whiteSpace: "pre-wrap" }}>
                          {applicant.coverLetter}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AdminJobsTab({
  jobs,
  jobForm,
  setJobForm,
  editJobId,
  setEditJobId,
  saveJob,
  deleteJob,
  saving,
}: {
  jobs: Job[];
  jobForm: JobForm | null;
  setJobForm: (f: JobForm | null) => void;
  editJobId: string | null;
  setEditJobId: (id: string | null) => void;
  saveJob: () => void;
  deleteJob: (id: string) => void;
  saving: boolean;
}) {
  const emptyJob = (): JobForm => ({
    title: "",
    description: "",
    location: "",
    category: "",
    type: "Full-time",
    requirements: [],
    applicationDeadline: "",
  });

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--charcoal)", margin: 0 }}>
          Vacancies
        </h2>
        <button
          onClick={() => { setEditJobId(null); setJobForm(emptyJob()); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 18px",
            background: "var(--charcoal)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontFamily: "DM Sans",
            fontSize: "0.84rem",
          }}
        >
          <Plus size={14} /> New Vacancy
        </button>
      </div>

      {jobForm && (
        <div style={{ background: "white", padding: "24px", marginBottom: 24, border: "1px solid var(--off-white)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontFamily: "DM Sans", fontSize: "0.88rem", fontWeight: 600, color: "var(--charcoal)" }}>
              {editJobId ? "Edit Vacancy" : "New Vacancy"}
            </span>
            <button
              onClick={() => { setJobForm(null); setEditJobId(null); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
            >
              <X size={16} />
            </button>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={LABEL_STYLE}>Job Title *</label>
                <input value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} style={INPUT_STYLE} placeholder="e.g. HVAC Technician" />
              </div>
              <div>
                <label style={LABEL_STYLE}>Location *</label>
                <input value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} style={INPUT_STYLE} placeholder="e.g. Nairobi, Kenya" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={LABEL_STYLE}>Category *</label>
                <input value={jobForm.category} onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })} style={INPUT_STYLE} placeholder="e.g. Technical" />
              </div>
              <div>
                <label style={LABEL_STYLE}>Type *</label>
                <select value={jobForm.type} onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })} style={INPUT_STYLE}>
                  {["Full-time", "Part-time", "Contract", "Internship"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={LABEL_STYLE}>Description *</label>
              <textarea
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                style={{ ...INPUT_STYLE, minHeight: 120, resize: "vertical" }}
                placeholder="Describe the role..."
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Application Deadline *</label>
              <input
                type="date"
                value={jobForm.applicationDeadline ?? ""}
                onChange={(e) => setJobForm({ ...jobForm, applicationDeadline: e.target.value })}
                style={INPUT_STYLE}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Requirements (one per line)</label>
              <textarea
                value={jobForm.requirements.join("\n")}
                onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value.split("\n").filter(Boolean) })}
                style={{ ...INPUT_STYLE, minHeight: 80, resize: "vertical" }}
                placeholder={"3+ years experience\nValid driving licence"}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => { setJobForm(null); setEditJobId(null); }}
                style={{ padding: "9px 20px", background: "none", border: "1px solid var(--off-white)", cursor: "pointer", fontFamily: "DM Sans", fontSize: "0.84rem", color: "var(--text-muted)" }}
              >
                Cancel
              </button>
              <button
                onClick={saveJob}
                disabled={saving}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 22px",
                  background: saving ? "var(--text-muted)" : "var(--charcoal)",
                  color: "white",
                  border: "none",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontFamily: "DM Sans",
                  fontSize: "0.84rem",
                }}
              >
                <Save size={14} /> {saving ? "Saving..." : "Save Vacancy"}
              </button>
            </div>
          </div>
        </div>
      )}

      {jobs.length === 0 && !jobForm ? (
        <div style={{ background: "white", padding: "48px 24px", textAlign: "center", color: "var(--text-muted)", fontFamily: "DM Sans", fontSize: "0.88rem" }}>
          No vacancies yet. Create one above.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 2 }}>
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              saving={saving}
              onEdit={() => {
                setEditJobId(job._id!);
                setJobForm({
                  title: job.title,
                  description: job.description,
                  location: job.location,
                  category: job.category,
                  applicationDeadline: job.applicationDeadline,
                  type: job.type,
                  requirements: job.requirements,
                });
              }}
              onDelete={() => job._id && deleteJob(job._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
