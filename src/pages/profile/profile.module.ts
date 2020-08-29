import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { UserProvider } from '../../providers/user/user';

/* File upload */
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FileUploadModule } from 'ng2-file-upload';





@NgModule({
  declarations: [
    ProfilePage
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    CommonModule, 
    FileUploadModule
  ],
  providers:[
    UserProvider,
    File,
    FilePath,
		Transfer,
		Camera
  ]
})
export class ProfilePageModule {}
