"use client";

import Toggle from "@/ui/components/Toggle";
import { Dispatch, SetStateAction, useState } from "react";
import create from "./actions";

export default function Page() {
  const [isRental, setIsRental] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [selectedDay, setSelectedDay] = useState("1");
  const [selectedSector, setSelectedSector] = useState("R1");

  const [msg, setMsg] = useState("");
  const [imageFile, setImageFile] = useState<File>();

  async function onCreate(formData: FormData) {
    formData.append("user_id", "sohan");
    formData.append("item_id", "test");
    formData.append("img", imageFile!);
    formData.append("expiryDate", selectedDay);
    formData.append("share", isShare ? "true" : "false");
    formData.append("rental", isRental ? "true" : "false");
    formData.append("location", selectedSector);

    const res = await create(formData);
    setMsg(res.message);
  }

  const handleOnImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];
    console.log("************raw file*********", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageFile(file);
    };
  };

  return (
    <form action={onCreate}>
      <label htmlFor="file">
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleOnImageFileChange}
        />
      </label>
      <input type="text" name="title" />
      <Toggle
        selected={isRental}
        setSelected={setIsRental}
        onText="해요"
        offText="안해요"
      />
      <Toggle
        selected={isShare}
        setSelected={setIsShare}
        onText="해요"
        offText="안해요"
      />
      <SelectDay selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <SelectSector
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
      />
      <button type="submit">Add</button>
      {msg}
    </form>
  );
}

const days = ["1", "2", "3"];

interface SelectDayProps {
  selectedDay: string;
  setSelectedDay: Dispatch<SetStateAction<string>>;
}

const SelectDay = ({ selectedDay, setSelectedDay }: SelectDayProps) => {
  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedDay(event.target.value);
  };
  return (
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
  );
};

interface SelectSectorProps {
  selectedSector: string;
  setSelectedSector: Dispatch<SetStateAction<string>>;
}

const SelectSector = ({
  selectedSector,
  setSelectedSector,
}: SelectSectorProps) => {
  const sectorEntries = Object.entries(sectors);
  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedSector(e.target.value);
  };

  return (
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
  );
};

const sectors: Record<string, string> = {
  F2: "냉동실 2층",
  F1: "냉동실 1층",
  R4: "냉장실 4층",
  R3: "냉장실 3층",
  R2: "냉장실 2층",
  R1: "냉장실 1층",
};
