import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Dashboard
import Dashboard from '../pages/Admins/Dashboard';

//Panels
import AdminPanel from '../pages/Admins/Panels/AdminPanel';
import ProfessorPanel from '../pages/Admins/Panels/ProfessorPanel';
import CoursesPanel from '../pages/Admins/Panels/CoursesPanel';
import StudentPanel from '../pages/Admins/Panels/StudentPanel';
import CoursePanel from '../pages/Admins/Panels/CoursePanel';
import UnitPanel from '../pages/Admins/Panels/UnitPanel';
import ClassPanel from '../pages/Admins/Panels/ClassPanel';

// New Entries
import NewAdmin from '../pages/Admins/NewEntries/NewAdmin';
import NewProfessor from '../pages/Admins/NewEntries/NewProfessor';
import NewStudent from '../pages/Admins/NewEntries/NewStudent';
import NewCourse from '../pages/Admins/NewEntries/NewCourse';
import NewUnit from '../pages/Admins/NewEntries/NewUnit';
import NewClass from '../pages/Admins/NewEntries/NewClass';

// Lists
import ListAdmins from '../pages/Admins/Lists/ListAdmins';
import ListProfessors from '../pages/Admins/Lists/ListProfessors';
import ListStudents from '../pages/Admins/Lists/ListStudents';
import ListCourses from '../pages/Admins/Lists/ListCourses';
import ListUnits from '../pages/Admins/Lists/ListUnits';
import ListClasses from '../pages/Admins/Lists/ListClasses';

// Load Files
import LoadAdminFile from '../pages/Admins/LoadFile/LoadAdminFile';
import LoadProfessorFile from '../pages/Admins/LoadFile/LoadProfessorFile';
import LoadStudentFile from '../pages/Admins/LoadFile/LoadStudentFile';
import LoadCourseFile from '../pages/Admins/LoadFile/LoadCourseFile';

// Edits
import EditAdmin from '../pages/Admins/Edits/EditAdmin';
import EditProfessor from '../pages/Admins/Edits/EditProfessor';
import EditStudent from '../pages/Admins/Edits/EditStudent';
import EditCourse from '../pages/Admins/Edits/EditCourse';
import EditUnit from '../pages/Admins/Edits/EditUnit';

const AdminRoutes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Dashboard} />
			{/* Admins */}
			<Route exact path="/admins" component={AdminPanel} />
			<Route path="/admins/new" component={NewAdmin} />
			<Route path="/admins/list" component={ListAdmins} />
			<Route path="/admins/file" component={LoadAdminFile} />
			<Route path="/admins/:user/edit" component={EditAdmin} />
			{/* Professors */}
			<Route exact path="/professors" component={ProfessorPanel} />
			<Route path="/professors/new" component={NewProfessor} />
			<Route path="/professors/list" component={ListProfessors} />
			<Route path="/professors/file" component={LoadProfessorFile} />
			<Route path="/professors/:user/edit" component={EditProfessor} />
			{/* Students */}
			<Route exact path="/students" component={StudentPanel} />
			<Route path="/students/new" component={NewStudent} />
			<Route path="/students/list" component={ListStudents} />
			<Route path="/students/file" component={LoadStudentFile} />
			<Route path="/students/:user/edit" component={EditStudent} />
			{/* Courses */}
			<Route exact path="/courses" component={CoursesPanel} />
			<Route path="/courses/new" component={NewCourse} />
			<Route path="/courses/list" component={ListCourses} />
			<Route path="/courses/file" component={LoadCourseFile} />
			<Route exact path="/courses/:course" component={CoursePanel} />
			<Route path="/courses/:course/edit" component={EditCourse} />
			{/* Units */}
			<Route exact path="/courses/:course/units" component={ListUnits} />
			<Route path="/courses/:course/units/new" component={NewUnit} />
			<Route exact path="/courses/:course/units/:unit" component={UnitPanel} />
			<Route path="/courses/:course/units/:unit/edit" component={EditUnit} />
			{/* Classes */}
			<Route
				exact
				path="/courses/:course/units/:unit/classes/"
				component={ListClasses}
			/>
			<Route
				path="/courses/:course/units/:unit/classes/new"
				component={NewClass}
			/>
			<Route
				path="/courses/:course/units/:unit/classes/:class_number"
				component={ClassPanel}
			/>
		</Switch>
	</BrowserRouter>
);

export default AdminRoutes;
