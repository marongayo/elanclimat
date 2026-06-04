// app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getJobs,
  saveJob,
  deleteJob,
  addApplicant,
  removeApplicant,
  getJobById,
} from "@/lib/db";

export async function GET() {
  try {
    const jobs = await getJobs();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json();
    await saveJob(jobData);
    return NextResponse.json(
      { message: "Job created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 },
    );
  }
}
export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData();

    const jobId = formData.get("jobId") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const linkedin = formData.get("linkedin") as string | null;
    const coverLetter = formData.get("coverLetter") as string;
    const cvFile = formData.get("cvFile") as File;

    if (!jobId || !fullName || !email || !coverLetter || !cvFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const existingJob = await getJobById(jobId);
    const duplicate = existingJob?.applicants?.some((a) => a.email === email);
    if (duplicate) {
      return NextResponse.json({ error: "Already applied" }, { status: 409 });
    }

    const uploadForm = new FormData();
    uploadForm.append("file", cvFile);

    const uploadRes = await fetch(`${process.env.NEXTAUTH_URL}/api/upload`, {
      method: "POST",
      body: uploadForm,
    });

    if (!uploadRes.ok) {
      return NextResponse.json({ error: "CV upload failed" }, { status: 500 });
    }

    const { url: cvUrl } = await uploadRes.json();

    await addApplicant(jobId, {
      fullName,
      email,
      phone: phone || undefined,
      linkedin: linkedin || undefined,
      coverLetter,
      cvUrl,
    });

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 },
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    // Withdraw application
    if (body.jobId && body.email) {
      await removeApplicant(body.jobId, body.email);
      return NextResponse.json(
        { message: "Application withdrawn" },
        { status: 200 },
      );
    }

    // Delete job vacancy
    if (body.id) {
      await deleteJob(body.id);
      return NextResponse.json(
        { message: "Job deleted successfully" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error in DELETE /api/jobs:", error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
