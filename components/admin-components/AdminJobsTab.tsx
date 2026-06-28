// components/admin-components/AdminJobsTab.tsx
"use client";

import { useState } from "react";
import {
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
import {
  INPUT_STYLE,
  LABEL_STYLE,
  SECTION_HEADING,
  EYEBROW,
  BTN_PRIMARY,
  BTN_GHOST,
  CHARCOAL,
  SAGE,
  SAGE_DARK,
  MUTED,
  OFF_WHITE,
  BODY,
} from "./_adminStyles";

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
  const isExpired = job.applicationDeadline && new Date(job.applicationDeadline) < new Date();

  return (
    <div
      style={{
        background: "white",
        borderLeft: `3px solid ${isExpired ? "#e8e4dd" : SAGE}`,
        transition: "border-color 0.2s",
      }}
    >
      {/* Header row */}
      <div
        style={{
          padding: "20px 24px",
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.05rem",
                fontWeight: 500,
                color: CHARCOAL,
                letterSpacing: "-0.01em",
              }}
            >
              {job.title}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: OFF_WHITE,
                color: MUTED,
                padding: "2px 8px",
              }}
            >
              {job.type}
            </span>
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              color: MUTED,
            }}
          >
            {job.category} · {job.location}
          </div>
          {job.applicationDeadline && (
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                color: isExpired ? "#c0392b" : MUTED,
                marginTop: 4,
              }}
            >
              Deadline:{" "}
              {new Date(job.applicationDeadline).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              {isExpired && " — Closed"}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>
          <button
            onClick={() => setExpanded((e) => !e)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              background: applicants.length > 0 ? "#f0f5f0" : OFF_WHITE,
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              color: applicants.length > 0 ? SAGE_DARK : MUTED,
              fontWeight: applicants.length > 0 ? 500 : 400,
            }}
          >
            <Users size={12} />
            {applicants.length} {applicants.length === 1 ? "applicant" : "applicants"}
            <ChevronDown
              size={12}
              style={{
                transform: expanded ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </button>
          <button
            onClick={onEdit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 14px",
              background: "none",
              border: `1px solid ${OFF_WHITE}`,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              color: CHARCOAL,
            }}
          >
            <Edit3 size={12} /> Edit
          </button>
          <button
            onClick={onDelete}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 12px",
              background: "#fef2f2",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              color: "#c0392b",
            }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Applicants */}
      {expanded && (
        <div
          style={{
            borderTop: `1px solid ${OFF_WHITE}`,
            padding: "0 24px 24px",
            background: "#fdfcfa",
          }}
        >
          {applicants.length === 0 ? (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: MUTED,
                paddingTop: 20,
                margin: 0,
                fontWeight: 300,
              }}
            >
              No applications yet.
            </p>
          ) : (
            <div style={{ display: "grid", gap: 1, marginTop: 16 }}>
              {applicants.map((applicant, i) => (
                <div key={applicant._id ?? i}>
                  <div
                    onClick={() =>
                      setSelectedApplicant(
                        selectedApplicant?._id === applicant._id ? null : applicant,
                      )
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 16px",
                      background:
                        selectedApplicant?._id === applicant._id ? "white" : "#fafaf8",
                      cursor: "pointer",
                      borderLeft:
                        selectedApplicant?._id === applicant._id
                          ? `2px solid ${SAGE}`
                          : "2px solid transparent",
                      transition: "background 0.15s, border-color 0.15s",
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: CHARCOAL,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "white",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {applicant.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          color: CHARCOAL,
                        }}
                      >
                        {applicant.fullName}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.72rem",
                          color: MUTED,
                          marginTop: 1,
                        }}
                      >
                        {applicant.email}
                        {applicant.appliedAt && (
                          <span style={{ marginLeft: 8 }}>
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
                      size={13}
                      style={{
                        color: MUTED,
                        transform:
                          selectedApplicant?._id === applicant._id
                            ? "rotate(180deg)"
                            : "none",
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
                        borderLeft: `2px solid ${SAGE}`,
                        display: "grid",
                        gap: 20,
                      }}
                    >
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                        <a
                          href={`mailto:${applicant.email}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.78rem",
                            color: CHARCOAL,
                            textDecoration: "none",
                          }}
                        >
                          <Mail size={12} /> {applicant.email}
                        </a>
                        {applicant.phone && (
                          <a
                            href={`tel:${applicant.phone}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.78rem",
                              color: CHARCOAL,
                              textDecoration: "none",
                            }}
                          >
                            <Phone size={12} /> {applicant.phone}
                          </a>
                        )}
                        {applicant.linkedin && (
                          <a
                            href={
                              applicant.linkedin.startsWith("http")
                                ? applicant.linkedin
                                : `https://${applicant.linkedin}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.78rem",
                              color: CHARCOAL,
                              textDecoration: "none",
                            }}
                          >
                            <Briefcase size={12} /> LinkedIn
                          </a>
                        )}
                        <a
                          href={getInlineCvUrl(applicant.cvUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: SAGE_DARK,
                            textDecoration: "none",
                            marginLeft: "auto",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          <ExternalLink size={12} /> View CV
                        </a>
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.6rem",
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: MUTED,
                            marginBottom: 10,
                          }}
                        >
                          Cover Letter
                        </div>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.82rem",
                            color: BODY,
                            lineHeight: 1.85,
                            fontWeight: 300,
                            margin: 0,
                            whiteSpace: "pre-wrap",
                          }}
                        >
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
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <p style={EYEBROW}>Hiring</p>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            marginTop: 8,
          }}
        >
          <div>
            <h1 style={SECTION_HEADING}>Vacancies</h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: MUTED,
                marginTop: 6,
                fontWeight: 300,
              }}
            >
              {jobs.length} open {jobs.length === 1 ? "position" : "positions"}
            </p>
          </div>
          <button
            onClick={() => { setEditJobId(null); setJobForm(emptyJob()); }}
            style={BTN_PRIMARY}
          >
            + New Vacancy
          </button>
        </div>
        <div style={{ width: 32, height: 1, background: "#c9a96e", marginTop: 16 }} />
      </div>

      {/* Inline form */}
      {jobForm && (
        <div
          style={{
            background: "white",
            padding: "28px 28px",
            marginBottom: 24,
            borderLeft: `3px solid #c9a96e`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: MUTED,
                  margin: "0 0 4px",
                }}
              >
                {editJobId ? "Editing" : "Creating"}
              </p>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  color: CHARCOAL,
                  letterSpacing: "-0.01em",
                }}
              >
                {editJobId ? "Edit Vacancy" : "New Vacancy"}
              </span>
            </div>
            <button
              onClick={() => { setJobForm(null); setEditJobId(null); }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: MUTED,
                display: "flex",
                alignItems: "center",
              }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={LABEL_STYLE}>Job Title *</label>
                <input
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  style={INPUT_STYLE}
                  placeholder="e.g. HVAC Technician"
                />
              </div>
              <div>
                <label style={LABEL_STYLE}>Location *</label>
                <input
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  style={INPUT_STYLE}
                  placeholder="e.g. Nairobi, Kenya"
                />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={LABEL_STYLE}>Category *</label>
                <input
                  value={jobForm.category}
                  onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                  style={INPUT_STYLE}
                  placeholder="e.g. Technical, Solar, Operations"
                />
              </div>
              <div>
                <label style={LABEL_STYLE}>Type *</label>
                <select
                  value={jobForm.type}
                  onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                  style={INPUT_STYLE}
                >
                  {["Full-time", "Part-time", "Contract", "Internship"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={LABEL_STYLE}>Description *</label>
              <textarea
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                style={{ ...INPUT_STYLE, minHeight: 120, resize: "vertical" }}
                placeholder="Describe the role, responsibilities, and team..."
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Application Deadline *</label>
              <input
                type="date"
                value={jobForm.applicationDeadline ?? ""}
                onChange={(e) =>
                  setJobForm({ ...jobForm, applicationDeadline: e.target.value })
                }
                style={INPUT_STYLE}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Requirements (one per line)</label>
              <textarea
                value={jobForm.requirements.join("\n")}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    requirements: e.target.value.split("\n").filter(Boolean),
                  })
                }
                style={{ ...INPUT_STYLE, minHeight: 80, resize: "vertical" }}
                placeholder={"3+ years HVAC experience\nValid driving licence\nNITA certification preferred"}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                paddingTop: 4,
              }}
            >
              <button
                onClick={() => { setJobForm(null); setEditJobId(null); }}
                style={BTN_GHOST}
              >
                Cancel
              </button>
              <button
                onClick={saveJob}
                disabled={saving}
                style={{
                  ...BTN_PRIMARY,
                  opacity: saving ? 0.6 : 1,
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                <Save size={14} />
                {saving ? "Saving..." : "Save Vacancy"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jobs list */}
      {jobs.length === 0 && !jobForm ? (
        <div
          style={{
            background: "white",
            padding: "56px 32px",
            textAlign: "center",
            border: `1px solid ${OFF_WHITE}`,
          }}
        >
          <Briefcase size={28} style={{ color: MUTED, opacity: 0.3, marginBottom: 12 }} />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: MUTED,
              margin: 0,
              fontWeight: 300,
            }}
          >
            No open vacancies. Use the button above to post a new role.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 1 }}>
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
