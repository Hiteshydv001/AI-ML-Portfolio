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
    <Container className="mt-8 sm:mt-16">
      <header className="max-w-2xl">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-purple-600">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <h1 className="text-4xl font-bold text-gray-800/90">
            Volunteer & Memberships
          </h1>
        </div>
        <p className="mt-4 text-base font-medium text-gray-500/80">
          A collection of my volunteer work and professional society memberships.
        </p>
      </header>

      <div className="mt-12 sm:mt-16">
        <div className="space-y-16">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600">
                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800/80">
                Society Memberships
              </h2>
            </div>
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
                  <h3 className="text-xl font-bold text-gray-800/90">
                    {membership.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500/90 mb-2">
                    {membership.role} · Member since {membership.memberSince}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700/90 mb-2">
                      Activities
                    </h4>
                    <ul className="list-disc pl-5 text-sm font-medium text-gray-500/80">
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
            <div className="flex items-center gap-3 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800/80">
                Volunteer Work
              </h2>
            </div>
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
                  <h3 className="text-xl font-bold text-gray-800/90">
                    {work.organization}
                  </h3>
                  <p className="text-sm font-medium text-gray-500/90">
                    {work.role} · {work.duration}
                  </p>
                  <p className="text-sm font-medium text-gray-500/90 mt-1">
                    {work.location}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500/80 line-clamp-3">
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