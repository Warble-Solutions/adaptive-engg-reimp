import Link from "next/link";
import Icon from "@/components/Icon";
import s from "./inner.module.css";

export default function NotFound() {
  return (
    <section className={s.notFound}>
      <div className="container">
        <b>404</b>
        <h1 className="h2" style={{ marginTop: 12 }}>
          Page not found
        </h1>
        <p className="lead">The page you&apos;re looking for has moved or no longer exists.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          <Link href="/" className="btn" id="nf-home">
            Back to Home <Icon name="arrow" />
          </Link>
          <Link href="/solutions/" className="btn btn-outline" id="nf-solutions">
            View Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
