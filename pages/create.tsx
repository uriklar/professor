import { TextField } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";

export default function Create() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: 40 }}>
        <form>
          <TextField label="שם (פרטי, מלא, בדוי..)" variant="outlined" />
        </form>
      </main>
    </div>
  );
}
