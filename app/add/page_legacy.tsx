"use client";
import colors from "@/lib/colors";
import Button from "@/ui/components/Button";
import Input from "@/ui/components/Input";
import { Spacing } from "@/ui/components/Spacing";
import Link from "next/link";
import React, { useState } from "react";
import create from "./actions";
import Scanner from "./scan/page";

export default function Add() {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDay, setSelectedDay] = useState("1");
  const days = ["1", "2", "3"];
  const [selectedSector, setSelectedSector] = useState("R1");
  const sectors: Record<string, string> = {
    F2: "냉동실 2층",
    F1: "냉동실 1층",
    R4: "냉장실 4층",
    R3: "냉장실 3층",
    R2: "냉장실 2층",
    R1: "냉장실 1층",
  };
  const sectorEntries = Object.entries(sectors);
  const [isRental, setIsRental] = useState("false");
  const [isShare, setIsShare] = useState("false");
  const [title, setTitle] = useState("");

  async function onCreate(formData: FormData) {
    console.log("************formData************\n");
    for (const value of formData.values()) {
      console.log(value);
    }
    const res = await create(formData);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedSector(e.target.value);
  };

  const handleRentalClick = (value: string) => {
    setIsRental(value);
  };

  const handleShareClick = (value: string) => {
    setIsShare(value);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedDay(event.target.value);
  };

  const onClickScan = () => {
    setIsScanning(true);
  };

  return isScanning ? (
    <>
      <Scanner />
      <Button onClick={() => setIsScanning(false)}>close</Button>
    </>
  ) : (
    <form action={onCreate}>
      <Spacing size={71} css={{ gridRow: "1" }} />
      <div
        css={{
          gridRow: "2",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/home">
          <Button>close</Button>
        </Link>
        <span
          css={{ marginLeft: "2%", fontSize: "x-large", fontWeight: "bold" }}
        >
          음식 넣기
        </span>
      </div>
      <label htmlFor="file" css={{ gridRow: "3" }}>
        <input
          type="file"
          id="file"
          accept="image/*"
          css={{ display: "none" }}
        />
        <Link href={"/add/scan"}>
          <Button onClick={onClickScan}>scan</Button>
        </Link>
      </label>
      <div
        css={{
          gridRow: "4 / 11",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Input label="제목" onChange={handleInputChange} css={{ width: "85%" }}>
          <Input.TextField></Input.TextField>
        </Input>
        <div>
          <label htmlFor="daySelect" css={{ paddingRight: "2%" }}>
            보관기간
          </label>
          <select
            id="daySelect"
            value={selectedDay}
            onChange={handleDayChange}
            css={{
              height: "4vh",
            }}
          >
            {days.map(day => (
              <option key={day} value={day}>
                {day}일
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="daySelect" css={{ paddingRight: "2%" }}>
            보관구역
          </label>
          <select
            id="sectorSelect"
            value={selectedSector}
            onChange={handleSectorChange}
            css={{
              height: "4vh",
            }}
          >
            {sectorEntries.map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Input label="밀폐용기 대여" css={{ width: "85%" }}>
            <div>
              <Button
                css={{
                  backgroundColor:
                    isRental === "true" ? colors.lightgreen400 : colors.grey400,
                }}
                onClick={() => handleRentalClick("true")}
              >
                해요
              </Button>
              <Button
                css={{
                  backgroundColor:
                    isRental === "false"
                      ? colors.lightgreen400
                      : colors.grey400,
                }}
                onClick={() => handleRentalClick("false")}
              >
                안해요
              </Button>
              <Input.TextField></Input.TextField>
            </div>
          </Input>
        </div>
        <div>
          <label htmlFor="share">나눔</label>
          <div id="share">
            <Button
              css={{
                backgroundColor:
                  isShare === "true" ? colors.lightgreen400 : colors.grey400,
              }}
              onClick={() => handleShareClick("true")}
            >
              해요
            </Button>
            <Button
              css={{
                backgroundColor:
                  isShare === "false" ? colors.lightgreen400 : colors.grey400,
              }}
              onClick={() => handleShareClick("false")}
            >
              안해요
            </Button>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        css={{
          gridRow: "11 / span 2",
          width: "100%",
          alignSelf: "center",
          justifySelf: "center",
        }}
      >
        보관하기 ( {selectedDay}일 X 100P = {parseInt(selectedDay) * -100}P )
      </Button>
    </form>
  );
}
