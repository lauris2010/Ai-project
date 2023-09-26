"use client";
import React, { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("bc52a5f8-fd90-40d1-a8aa-32165419e14d");
  }, []);

  return null;
};

export default CrispChat;
