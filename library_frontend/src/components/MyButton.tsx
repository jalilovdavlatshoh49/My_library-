import React from "react";
import { Button, ButtonProps } from "react-native-paper";

export default function MyButton(props: ButtonProps) {
  return <Button mode="contained" style={{ marginVertical: 8 }} {...props} />;
}