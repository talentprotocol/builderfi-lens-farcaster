-- Posts Table
CREATE TABLE "posts_dev" (
  "id" SERIAL PRIMARY KEY,
  "content_id" VARCHAR(255) UNIQUE,
  "builderfi_user_id" INT,
  "username" VARCHAR(255),
  "source" VARCHAR(255),
  "published_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Posts Table
CREATE TABLE "posts_prod" (
  "id" SERIAL PRIMARY KEY,
  "content_id" VARCHAR(255) UNIQUE,
  "builderfi_user_id" INT,
  "username" VARCHAR(255),
  "source" VARCHAR(255),
  "published_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NOW()
);