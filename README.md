# SvelteKit + Firebase + SSR

This is just an example of how you can use all the firebase goodies on the browser and on the server side.
You need to setup firebase and firebase admin. The admin is used to verify user tokens server side. This includes custom auth pages and actions.

# Dev Setup

save youself some time and have prettier auto run

```bash
cat << EOF > .git/hooks/pre-commit
#!/bin/sh
FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
[ -z "$FILES" ] && exit 0

# Prettify all selected files
echo "$FILES" | xargs ./node_modules/.bin/prettier --ignore-unknown --write

# Add back the modified/prettified files to staging
echo "$FILES" | xargs git add

exit 0
EOF

chmod +x .git/hooks/pre-commit
```

Create .env file.
(Yes I know the export isn't standard practice but the sdk doesn't load it with just .env so gotta source it with an export.)

```bash
cat << EOF > .env
PUBLIC_FIREBASE_PROJECT_ID=""
PUBLIC_FIREBASE_API_KEY=""
PUBLIC_FIREBASE_AUTH_DOMAIN=""
PUBLIC_FIREBASE_STORAGE_BUCKET=""
PUBLIC_FIREBASE_MESSAGE_SENDER_ID=""
PUBLIC_FIREBASE_APP_ID=""
export GOOGLE_APPLICATION_CREDENTIALS="$PWD/firebase-sa.json"
EOF
```

running

```bash
source .env
npm run dev
```

# TODO

https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection
