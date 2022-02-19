import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  { 
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  { 
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  }
  // { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  // { path: 'forgot', loadChildren: './pages/forgot/forgot.module#ForgotPageModule' },
  // { path: 'result', loadChildren: './pages/result/result.module#ResultPageModule' },
  // { path: 'clinic/:cid', loadChildren: './pages/clinic/clinic.module#ClinicPageModule' },
  // { path: 'doctor/:did', loadChildren: './pages/doctor/doctor.module#DoctorPageModule' },
  // { path: 'clinic/:cid/doctor/:did', loadChildren: './pages/doctor/doctor.module#DoctorPageModule' },
  // { path: 'message', loadChildren: './pages/message/message.module#MessagePageModule' },
  // { path: 'profile-edit', loadChildren: './pages/profile-edit/profile-edit.module#ProfileEditPageModule' },
  // { path: 'profile-address', loadChildren: './pages/profile-address/profile-address.module#ProfileAddressPageModule' },
  // { path: 'profile-password', loadChildren: './pages/profile-password/profile-password.module#ProfilePasswordPageModule' },
  // { path: 'appointment-view/:aid', loadChildren: './pages/appointment-view/appointment-view.module#AppointmentViewPageModule' },
  // { path: 'appointment-detail', loadChildren: './pages/appointment-detail/appointment-detail.module#AppointmentDetailPageModule' },
  // { path: 'review', loadChildren: './pages/review/review.module#ReviewPageModule' },
  // { path: 'review-details', loadChildren: './pages/review-details/review-details.module#ReviewDetailsPageModule' },
  // { path: 'medical-list', loadChildren: './pages/medical-list/medical-list.module#MedicalListPageModule' },
  // { path: 'search-modal/:searchid', loadChildren: './pages/search-modal/search-modal.module#SearchModalPageModule' },
  // { path: 'search-clinic', loadChildren: './pages/search-clinic/search-clinic.module#SearchClinicPageModule' },
  // { path: 'search-doctor', loadChildren: './pages/search-doctor/search-doctor.module#SearchDoctorPageModule' },
  // { path: 'filter', loadChildren: './pages/filter/filter.module#FilterPageModule' },
  // { path: 'filter-result/:lowerprice/:higherprice/:gender', loadChildren: './pages/filter-result/filter-result.module#FilterResultPageModule' },
  // // { path: 'appointment', loadChildren: './pages/appointment/appointment.module#AppointmentPageModule' },
  // { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
