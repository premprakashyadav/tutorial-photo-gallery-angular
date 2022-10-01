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
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then( m => m.ForgotPageModule)
 },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then( m => m.ResultPageModule)
  },
  {
    path: 'clinic/:cid',
    loadChildren: () => import('./pages/clinic/clinic.module').then( m => m.ClinicPageModule)
  },
  { 
    path: 'doctor/:did',
    loadChildren: () => import('./pages/doctor/doctor.module').then( m => m.DoctorPageModule)
  },
  {
    path: 'clinic/:cid/doctor/:did',
    loadChildren: () => import('./pages/doctor/doctor.module').then( m => m.DoctorPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'profile-address',
    loadChildren: () => import('./pages/profile-address/profile-address.module').then( m => m.ProfileAddressPageModule)
  },
  {
    path: 'profile-password',
    loadChildren: () => import('./pages/profile-password/profile-password.module').then( m => m.ProfilePasswordPageModule)
  },
  {
    path: 'appointment-view/:aid',
    loadChildren: () => import('./pages/appointment-view/appointment-view.module').then( m => m.AppointmentViewPageModule)
  },
  {
    path: 'appointment-detail',
    loadChildren: () => import('./pages/appointment-detail/appointment-detail.module').then( m => m.AppointmentDetailPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./pages/review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'review-details',
    loadChildren: () => import('./pages/review-details/review-details.module').then( m => m.ReviewDetailsPageModule)
  },
  {
    path: 'medical-list',
    loadChildren: () => import('./pages/medical-list/medical-list.module').then( m => m.MedicalListPageModule)
  },
  {
    path: 'search-modal/:searchid',
    loadChildren: () => import('./pages/search-modal/search-modal.module').then( m => m.SearchModalPageModule)
  },
  {
    path: 'search-clinic',
    loadChildren: () => import('./pages/search-clinic/search-clinic.module').then( m => m.SearchClinicPageModule)
  },
  {
    path: 'search-doctor',
    loadChildren: () => import('./pages/search-doctor/search-doctor.module').then( m => m.SearchDoctorPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./pages/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'filter-result/:lowerprice/:higherprice/:gender',
    loadChildren: () => import('./pages/filter-result/filter-result.module').then( m => m.FilterResultPageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./pages/appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'visitor',
    loadChildren: () => import('./pages/visitor/visitor.module').then( m => m.VisitorPageModule)
  },
  {
    path: 'home-service',
    loadChildren: () => import('./pages/home-service/home-service.module').then( m => m.HomeServicePageModule)
  },
  {
    path: 'post-offer',
    loadChildren: () => import('./pages/post-offer/post-offer.module').then( m => m.PostOfferPageModule)
  },
  {
    path: 'one-click',
    loadChildren: () => import('./pages/one-click/one-click.module').then( m => m.OneClickPageModule)
  },
  {
    path: 'health-check-up',
    loadChildren: () => import('./pages/health-check-up/health-check-up.module').then( m => m.HealthCheckUpPageModule)
  },
  {
    path: 'request-call',
    loadChildren: () => import('./pages/request-call/request-call.module').then( m => m.RequestCallPageModule)
  },
  {
    path: 'second-opinion',
    loadChildren: () => import('./pages/second-openion/second-openion.module').then( m => m.SecondOpenionPageModule)
  },
  {
    path: 'online-appointment',
    loadChildren: () => import('./pages/online-appointment/online-appointment.module').then( m => m.OnlineAppointmentPageModule)
  },
  {
    path: 'any-other',
    loadChildren: () => import('./pages/any-other/any-other.module').then( m => m.AnyOtherPageModule)
  },
  {
    path: 'partner',
    loadChildren: () => import('./pages/partner/partner.module').then( m => m.PartnerPageModule)
  },
  {
    path: 'hospital',
    loadChildren: () => import('./pages/hospital/hospital.module').then( m => m.HospitalPageModule)
  },
  {
    path: 'homehealthcare',
    loadChildren: () => import('./pages/homehealthcare/homehealthcare.module').then( m => m.HomehealthcarePageModule)
  },
  {
    path: 'medical-records',
    loadChildren: () => import('./pages/medical-records/medical-records.module').then( m => m.MedicalRecordsPageModule)
  },
  {
    path: 'makeapayment',
    loadChildren: () => import('./pages/makeapayment/makeapayment.module').then( m => m.MakeapaymentPageModule)
  },
  {
    path: 'online-pharmacy',
    loadChildren: () => import('./pages/online-pharmacy/online-pharmacy.module').then( m => m.OnlinePharmacyPageModule)
  },
  {
    path: 'health-buddy',
    loadChildren: () => import('./pages/health-buddy/health-buddy.module').then( m => m.HealthBuddyPageModule)
  },
  {
    path: 'medicalreports',
    loadChildren: () => import('./pages/medicalreports/medicalreports.module').then( m => m.MedicalreportsPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
