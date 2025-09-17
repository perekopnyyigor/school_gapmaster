import {useEffect, useState} from "react";
import {data, useLocation} from "react-router-dom";
import axios from "axios";

function Redactor({card})
{
    return(<h1>{card}</h1>)
}

export default Redactor