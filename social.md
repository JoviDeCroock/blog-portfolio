# Social posts — Hardening npm Publishing

## X (Twitter)

Supply chain attacks are real. New post on hardening npm publishing + what consumers can do: OIDC trusted publishing, GitHub Environment gates, provenance — and why you should switch to pnpm. It has native minimumReleaseAge and trustPolicy: no-downgrade built in.

jovidecroock.com/blog/secure-npm-publishing

---

## Bluesky

New post on supply chain security for npm packages — covering the publishing workflow I push in the projects I maintain, plus the consumer side: why pnpm is a better default than npm, its native minimumReleaseAge config, and trustPolicy: no-downgrade to catch provenance regressions automatically.

jovidecroock.com/blog/secure-npm-publishing

---

## LinkedIn

I've been thinking a lot about npm supply chain security lately and wrote up the publishing setup I'm pushing across the open source projects I maintain.

For maintainers: use OIDC trusted publishing instead of storing long-lived tokens, gate automated releases behind GitHub Environments, enable package provenance, and keep your manual publisher list short.

For consumers: switch to pnpm if you haven't already. Beyond being more reliable than npm, it has native `minimumReleaseAge` support (defaults to 1 day in v11) and a `trustPolicy: no-downgrade` setting that refuses to install a package version whose provenance level dropped compared to previous releases. No Renovate config needed.

Both sides of this compound each other's efforts.

👉 jovidecroock.com/blog/secure-npm-publishing
