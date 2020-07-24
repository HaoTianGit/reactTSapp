import React, { useState, useEffect } from 'react';
import MediaCard from '../MediaCardComponent/MediaCard';
import { Grid } from '@material-ui/core';
import './MediaGrid.css';

interface IState {//change later
    description: any;
    urlToImage: any;
}
interface IMediaGridProps {
    SearchQuery: (string | null);
}
function MediaGrid(props: IMediaGridProps) {
    const [ItemArray, setItemArray] = useState<IState[]>([{description: "", urlToImage: ""}]);

    useEffect(() => {
        fetch('http://newsapi.org/v2/everything?q='+ props.SearchQuery + '&from=2020-06-23&sortBy=publishedAt&apiKey=')//change later
            .then(response => response.json())
            //.then(data => console.log(data))
            .then(response => {
                setItemArray(response.articles)
            })
            .catch(() => console.log("it didn't work")
            );

    }, [props.SearchQuery]);

    var Cards: JSX.Element[] = [];
    ItemArray.forEach((el: IState, i: Number) => {
        if (!el || !el.urlToImage || !el.description) {
            return;
        }
        Cards.push(
            <Grid key={"card_"+i} item sm={6} md={4} lg={3} className="MediaGridCard">
                <MediaCard ImageUrl={el.urlToImage} Description={el.description} />
            </Grid>)
    })

    return (
        <div>
            <Grid container spacing={3} className="MediaGridContainer">
                {Cards}
            </Grid>
        </div>
    )
}

export default MediaGrid