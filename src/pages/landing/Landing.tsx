import { FC } from 'react';
import {Title} from "@mantine/core";
import Navbar from '../navbar/Navbar';
import ResourseList from '../resourceList/ResourseList';

const Landing: FC = () => {
	return <>
	<Navbar/>
	{/* resource list page with tables and sorting , quering*/}
	<ResourseList/>
		{/* <Title order={4}> Hello World </Title> */}
	</>;
};

export default Landing

