"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function ZipInput() {
    const [zipCode, setZipcode] = useState("");
    const router = useRouter();

    return (
        <div>
            <label> Enter Zip Code</label>
            <br/>
            <br/>
            <input
                type={"text"}
                name={"ZipCode Input"}
                className={"ZipCodeInput"}
                placeholder={"Enter Zip Code here"}
                value={zipCode}
                onChange={(e) => setZipcode(e.target.value)}
            >
            </input>
            <br/>
            <br/>
            <input
                type={"submit"}
                onClick={() => {
                    router.push("/zipcode/" + zipCode)
                }}
            >
            </input>
        </div>
    )
}
