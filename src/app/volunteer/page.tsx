import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { societyMemberships, volunteerWork } from "@/constants/volunteer";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Volunteer & Memberships | Portfolio",
  description: "My volunteer work and society memberships",
};

export default function VolunteerPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-medium text-gray-800/90">
          Volunteer & Memberships
        </h1>
        <p className="mt-6 text-base text-gray-500/80">
          A collection of my volunteer work and professional society memberships.
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <div className="space-y-20">
          <section>
            <h2 className="text-2xl font-medium text-gray-800/80 mb-8">
              Society Memberships
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {societyMemberships.map((membership) => (
                <div
                  key={membership.name}
                  className="group relative flex flex-col items-start rounded-2xl bg-gray-50/50 p-6 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  {membership.logo && (
                    <div className="relative w-16 h-16 mb-4">
                      <Image
                        src={membership.logo}
                        alt={membership.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-medium text-gray-800/90">
                    {membership.name}
                  </h3>
                  <p className="text-sm text-gray-500/90 mb-2">
                    {membership.role} · Member since {membership.memberSince}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700/90 mb-2">
                      Activities
                    </h4>
                    <ul className="list-disc pl-5 text-sm text-gray-500/80">
                      {membership.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                  {membership.certificate && (
                    <Link
                      href={membership.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-500/90 hover:text-emerald-600/90 transition"
                    >
                      View Certificate
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition group-hover:translate-x-0.5"
                      >
                        <path
                          d="M5.5 3.5L10.5 8.5L5.5 13.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-800/80 mb-8">
              Volunteer Work
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {volunteerWork.map((work) => (
                <Link
                  key={work.slug}
                  href={`/volunteer/${work.slug}`}
                  className="group relative flex flex-col items-start rounded-2xl bg-gray-50/50 p-6 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <Image
                      src={work.logo || "/images/placeholder.png"}
                      alt={work.organization}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800/90">
                    {work.organization}
                  </h3>
                  <p className="text-sm text-gray-500/90">
                    {work.role} · {work.duration}
                  </p>
                  <p className="text-sm text-gray-500/90 mt-1">
                    {work.location}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500/80 line-clamp-3">
                      {work.description[0]}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {work.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200/50 text-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                    {work.skills.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200/50 text-gray-600">
                        +{work.skills.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-500/90 group-hover:text-emerald-600/90">
                    Learn more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition group-hover:translate-x-0.5"
                    >
                      <path
                        d="M5.5 3.5L10.5 8.5L5.5 13.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}