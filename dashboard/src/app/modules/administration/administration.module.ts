import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileUiModule } from '~/modules/user/modules/profile-ui/profile-ui.module';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { ChangePasswordModule } from '~/modules/authentication/modules/change-password/change-password.module';
import { UiUserModule } from '~/modules/user/modules/ui-user/ui-user.module';
import { TerritoryUiModule } from '~/modules/territory/modules/territory-ui/territory-ui.module';
import { SharedModule } from '~/shared/shared.module';
import { OperatorUiModule } from '~/modules/operator/modules/operator-ui/operator-ui.module';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationLayoutComponent } from './administration-layout/administration-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TerritoryComponent } from './pages/territory/territory.component';
import { UsersComponent } from './pages/users/users.component';
import { OperatorComponent } from './pages/operator/operator.component';

@NgModule({
  declarations: [
    AdministrationLayoutComponent,
    OperatorComponent,
    ProfileComponent,
    TerritoryComponent,
    UsersComponent,
  ],
  imports: [
    AdministrationRoutingModule,
    ChangePasswordModule,
    CommonModule,
    MaterialModule,
    ProfileUiModule,
    UiUserModule,
    ToastrModule,
    TerritoryUiModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OperatorUiModule,
  ],
})
export class AdministrationModule {}
