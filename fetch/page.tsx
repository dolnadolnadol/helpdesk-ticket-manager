"use client"

import { useRouter } from "next/navigation";
import { Text } from "@mantine/core";
import { useEffect } from "react";

export default function FetchDepartments() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);
  return (
    <>
      <Text ta={"center"}>Loading...</Text>
    </>
  );
}
