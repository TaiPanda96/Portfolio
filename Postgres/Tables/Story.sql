CREATE TABLE IF NOT EXISTS "story" (
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "duration" VARCHAR NOT NULL,
    "skills" VARCHAR ARRAY NOT NULL,
    "difficulty" VARCHAR NOT NULL,
    "author" VARCHAR NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY("title", "author")
)
