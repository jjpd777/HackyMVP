import React, { useEffect, useState } from 'react';
import {
    Button,
    FormInput,
    Card,
    CardBody,
} from 'shards-react';
import CardTemplate from './CardTemplate'

function CardCollection(){

    return(
<>
    <CardTemplate/>
    <CardTemplate/>
    <CardTemplate/>
</>

    )
}

export default CardCollection;