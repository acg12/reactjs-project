import React, { useState } from "react";
import cn from "classnames";
import "./VerticalCarousel.css";
import { gql, useQuery } from '@apollo/client'

function VerticalCarousel() {
    const name = 'Ed Sheeran'
    
    const [activeIndex, setActiveIndex] = useState(0);

    const GETTRACKS_QUERY = gql`
        query GetTracks($n: String!) {
            artist(name: $n) {
                albums {
                    tracks {
                        id
                        name
                        preview_url
                    }
                }
            }
        }
    `
    const {loading, error, data} = useQuery(GETTRACKS_QUERY, {
        variables: {
            n: name
        }
    })

    if(loading) return <div>Loading...</div>
    if(error) return <div>error</div>

    var tracks = []
    for(let i = 0; i < data.artist.albums.length; i++) {
        for(let j = 0; j < data.artist.albums[i].tracks.length; j++) {
            tracks.push(data.artist.albums[i].tracks[j])
        }
    }

    // Used to determine which items appear above the active item
    const halfwayIndex = Math.ceil(tracks.length / 2);

    // Usd to determine the height/spacing of each item
    const itemHeight = 120;

    // Used to determine at what point an item is moved from the top to the bottom
    const shuffleThreshold = halfwayIndex * itemHeight;

    // Used to determine which items should be visible. this prevents the "ghosting" animation
    const visibleStyleThreshold = shuffleThreshold / 2;

    const determinePlacement = (itemIndex) => {
    // If these match, the item is active
        if (activeIndex === itemIndex) return 0;

        if (itemIndex >= halfwayIndex) {
            if (activeIndex > itemIndex - halfwayIndex) {
                return (itemIndex - activeIndex) * itemHeight;
            } else {
                return -(tracks.length + activeIndex - itemIndex) * itemHeight;
            }
        }

        if (itemIndex > activeIndex) {
            return (itemIndex - activeIndex) * itemHeight;
        }

        if (itemIndex < activeIndex) {
            if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
                return (tracks.length - (activeIndex - itemIndex)) * itemHeight;
            }
                return -(activeIndex - itemIndex) * itemHeight;
        }
    };

    return (
        <div className="container">
            <div className="carousel-wrapper">
                <div className="carousel">
                    <div className="slides">
                        <div className="carousel-inner">
                            {tracks?.map((item, i) => (
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex(i)}
                                    className={cn("carousel-item", {
                                        active: activeIndex === i,
                                        visible:
                                        Math.abs(determinePlacement(i)) <= visibleStyleThreshold
                                    })}
                                    key={item.id}
                                    style={{
                                        transform: `translateY(${determinePlacement(i)}px)`
                                    }}>
                                    <div className="track-card">
                                        <div className="track-name">{item.name}</div>
                                        <audio src={item.preview_url} controls></audio>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerticalCarousel