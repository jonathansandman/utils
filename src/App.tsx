import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Truncator } from "./Truncator";
import { Input, Layout, Menu } from "antd";
import { Content, Header } from "antd/lib/layout/layout";

function App() {
  const [text, setText] = useState("");

  return (
    <Layout className="fill">
      <Header
        className="header"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          color: "white",
          fontStyle: "italic",
        }}
      >
        <div
          style={{
            fontFamily: "font-family: 'Lato', sans-serif",
            fontWeight: "bold",
            fontSize: "2em",
          }}
        >
          TRUNCATE
        </div>
      </Header>
      <Content>
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            padding: 8,
          }}
        >
          <div
            style={{
              width: "50%",
              height: "100%",
              padding: 8,
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div style={{ marginBottom: 8 }}>INPUT</div>
            <Input.TextArea
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              style={{
                resize: "none",
                width: "100%",
                height: "95%",
              }}
            />
          </div>
          <div style={{ width: "50%", height: "50%", padding: 8 }}>
            <div>
              <div style={{ marginBottom: 8 }}>OUTPUT</div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>Original string</div>
                <div style={{ flex: 0.75 }}>8-char</div>
                <div style={{ flex: 0.5 }}>4-char</div>
              </div>
              {text
                .split(/\r?\n/)
                .filter((x) => x.trim().length > 0)
                .map((t) => (
                  <Truncator text={t} />
                ))}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
