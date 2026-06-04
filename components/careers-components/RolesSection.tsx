"use client";

import { useState, useEffect } from "react";
import { Eyebrow } from "@/components/careers-components/Eyebrow";
import { RoleRow } from "@/components/careers-components/RoleRow";
import { AppStatus, Role } from "@/components/careers-components/_tokens";
import type { Job } from "@/lib/types/jobs";
import { C } from "@/lib/constants";

export function RolesSection() {
  const [roles, setRoles] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [openRole, setOpenRole] = useState<string | null>(null);
  const [appStatus, setAppStatus] = useState<Record<string, AppStatus>>({});

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((data) => {
        const active = Array.isArray(data)
          ? data.filter(
              (j: Job) => new Date(j.applicationDeadline) >= new Date(),
            )
          : [];
        setRoles(active);
      })
      .finally(() => setLoading(false));
  }, []);

  function setStatus(id: string, s: AppStatus) {
    setAppStatus((p) => ({ ...p, [id]: s }));
  }

  function toggle(role: Job) {
    setOpenRole((prev) => (prev === role._id ? null : role._id!));
  }

  const empty = !loading && roles.length === 0;

  return (
    <section style={{ backgroundColor: C.offWhite, padding: "96px 0" }}>
      <div className="careers-inner">
        <div
          className="careers-roles-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            marginBottom: 64,
            paddingBottom: 48,
            borderBottom: `1px solid ${C.rule}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Eyebrow text="Open Positions" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: C.charcoal,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {loading
                ? "— roles, one team;"
                : empty
                  ? "No open roles right now;"
                  : `${roles.length} roles, one team;`}
              <br />
              <em style={{ fontStyle: "italic", color: C.sage }}>
                {empty ? "but we'd love to hear from you" : "genuinely open"}
              </em>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.84rem",
              color: C.muted,
              lineHeight: 1.85,
              paddingTop: 8,
              fontWeight: 300,
            }}
          >
            {empty
              ? "We don't have any advertised vacancies at the moment, but we're always interested in meeting great people. Send us a note at careers@example.com and tell us what you do."
              : "Roles across technical, operations, sales, and creative — each one real. We are looking for people, not just CVs. Click any role to read more and apply directly below."}
          </p>
        </div>

        {loading && (
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.84rem",
              color: C.muted,
            }}
          >
            Loading roles…
          </p>
        )}

        {!loading && !empty && (
          <div>
            {roles.map((job, i) => {
              const role: Role = {
                ...job,
                index: String(i + 1).padStart(2, "0"),
              };
              return (
                <RoleRow
                  key={job._id}
                  role={role}
                  isOpen={openRole === job._id}
                  status={appStatus[job._id!] ?? "idle"}
                  onToggle={() =>
                    setOpenRole((prev) => (prev === job._id ? null : job._id!))
                  }
                  onOpenForm={() => setStatus(job._id!, "form")}
                  onFormSuccess={() => setStatus(job._id!, "success")}
                  onFormCancel={() => setStatus(job._id!, "idle")}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
