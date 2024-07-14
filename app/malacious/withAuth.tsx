/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.push("/loginpage");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
