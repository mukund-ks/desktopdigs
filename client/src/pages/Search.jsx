import React, { useEffect, useState } from "react";
import axios from "@/api/axios.js";
import { Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types';
import "./SearchStyles.css";

ShowTags.propTypes = {
    setTag: PropTypes.func,
    checked: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    key: PropTypes.number,
};

function ShowTags(props) {
    return (
        <label className="text-mywhite bg-myGray mx-2 p-2 rounded-md radio-label">
            <input
                type="radio"
                className="mx-1 radio-input"
                id={props.key}
                checked={props.checked == props.value}
                onChange={() => props.setTag(props.value)}
            />
            <span className="mx-1 custom-radio" />
            {props.label}
        </label>
    );
}

export default function Search() {
    const [game, setGame] = useState('');
    const [gameList, setGameList] = useState([]);
    const [brand, setBrand] = useState('');
    const [brandList, setBrandList] = useState([]);

    const TAG_URL = "/api/images/all-tags";

    useEffect(() => {
        (async function fetchTags() {
            try {
                const res = await axios.get(TAG_URL, { headers: { "Content-Type": "application/json" } });

                const brandTags = res?.data?.brandTags;
                const gameTags = res?.data?.gameTags;

                setBrandList(() => [...brandTags]);
                setGameList(() => [...gameTags]);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [])

    console.log(game);
    console.log(brand);
    return (
        <div className="flex flex-col absolute">
            <section className="h-[100vh] w-[100vw] items-center flex flex-col justify-center md:snap-center gap-y-40">
                <div>
                    <Typography variant="h1" className="text-myRed3">Search Page</Typography>
                    <Typography variant="lead" className="text-myGray">tag and discover.</Typography>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <Typography
                        variant="h4"
                        className="text-myRed3"
                    >
                        Select Game
                    </Typography>
                    <div className="flex flex-row items-center justify-center">
                        {
                            gameList.map((g, id) => {
                                return (
                                    <ShowTags setTag={setGame} checked={game} label={g} value={g} key={id} />
                                );
                            })
                        }
                    </div>
                    <Typography
                        variant="h4"
                        className="text-myRed3"
                    >
                        Select Brand
                    </Typography>
                    <div className="flex flex-row flex-wrap gap-3 justify-center">
                        {
                            brandList.map((b, id) => {
                                return (
                                    <ShowTags setTag={setBrand} checked={brand} label={b} value={b} key={id} />
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}