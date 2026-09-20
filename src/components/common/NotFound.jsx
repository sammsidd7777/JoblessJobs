import { Link } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness, Home, SearchX } from "lucide-react";
import Seo from "./Seo";

const NotFound = () => {
  return (
    <>
      <Seo title="Page Not Found" noindex />

      <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#fafaf9] px-4 py-16 text-slate-900 dark:bg-[#080808] dark:text-white">
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[100px]" />

        <div className="relative z-10 w-full max-w-xl text-center">
          {/* 404 Icon */}
          <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#d4af37]/20 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.06)] dark:border-[#d4af37]/20 dark:bg-white/[0.04]">
            <SearchX
              size={42}
              strokeWidth={1.6}
              className="text-[#b8952e] dark:text-[#d4af37]"
            />
          </div>

          {/* 404 */}
          <div className="mb-2 select-none text-7xl font-black tracking-[-0.06em] text-slate-900 sm:text-8xl dark:text-white">
            404
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Oops! This page doesn't exist.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base dark:text-slate-400">
            The page you're looking for may have been removed, renamed, or
            the link might be incorrect.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <Home size={17} />
              Go Home
            </Link>

            <Link
              to="/find-jobs"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/50 hover:text-[#9a7a18] dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37]"
            >
              <BriefcaseBusiness size={17} />
              Browse Jobs
            </Link>
          </div>

          {/* Back */}
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to JoblessJob
          </Link>

          {/* Brand */}
          <div className="mt-12 text-xs font-medium tracking-wide text-slate-400">
            From <span className="font-bold text-[#b8952e]">Jobless</span>{" "}
            to <span className="font-bold text-slate-700 dark:text-slate-200">Hired</span>{" "}
            🚀
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;