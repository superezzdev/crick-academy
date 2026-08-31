import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@crick-academy/ui";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { getStudentById, getStudentsList } from "@/lib/data";
import { StudentProfileView } from "@/components/dashboard/student-profile-view";

interface StudentDetailPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  const students = getStudentsList();
  return students.map((s) => ({
    id: s.id
  }));
}

export function generateMetadata({
  params
}: StudentDetailPageProps): Metadata {
  const student = getStudentById(params.id);
  if (!student) {
    return {
      title: "Player Not Found | CrickAcademy"
    };
  }

  return {
    title: `${student.name} - Profile & Stats | CrickAcademy`,
    description: `Player discipline, batting/bowling statistics, fee payment history, and match records for ${student.name} (${student.batch}).`
  };
}

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const student = getStudentById(params.id);

  if (!student) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-leather-red/15 text-leather-red">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="font-heading text-3xl font-bold">Player Not Found</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          The requested student ID could not be located in the CrickAcademy database.
        </p>
        <Link href="/dashboard/students">
          <Button variant="pitch" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Squad Directory
          </Button>
        </Link>
      </div>
    );
  }

  return <StudentProfileView student={student} />;
}
