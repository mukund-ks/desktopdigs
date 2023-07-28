import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types';

ShowTags.propTypes = {
    setTag: PropTypes.func,
    checked: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
};

function ShowTags(props) {
    return (
        <label className="text-mywhite bg-myGray mx-2 p-2 rounded-xl">
            <input
                type="radio"
                className="mx-1"
                checked={props.checked == props.value}
                onChange={() => props.setTag(props.value)}
            />
            <span className="mx-1">{props.label}</span>
        </label>
    );
}

export default function Search() {
    const [game, setGame] = useState('');
    const [brand, setBrand] = useState('');

    const gameList = ["FH4", "FH5"];
    const brandList = ["BMW", "Audi", "Ferrari", "Lamborghini"];

    console.log(game);
    console.log(brand);
    return (
        <div className="flex flex-col absolute">
            <section className="h-[100vh] w-[100vw] items-center flex flex-col justify-around md:snap-center gap-1">
                <Typography variant="h1" className="text-mywhite">Search Page</Typography>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center">
                        <Typography variant="paragraph" className="text-mywhite text-lg">Select Game</Typography>
                        {
                            gameList.map((g, id) => (
                                <ShowTags setTag={setGame} checked={game} label={g} value={g} key={id} />
                            ))
                        }
                    </div>
                    <div className="flex flex-row items-center">
                        <Typography variant="paragraph" className="text-mywhite text-lg">Select Brand</Typography>
                        {
                            brandList.map((b, id) => (
                                <ShowTags setTag={setBrand} checked={brand} label={b} value={b} key={id} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}