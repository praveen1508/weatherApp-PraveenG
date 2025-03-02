import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './component/weather.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherApiService } from './store/weather-api.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/weather.reducer';
import { WeatherStoreEffects } from './store/weather.effects';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { WeatherFacadeService } from './store/weather-facade.service';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  exports: [
    WeatherComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forFeature('weather', reducer),
    EffectsModule.forFeature([WeatherStoreEffects])
  ],
  providers: [WeatherApiService,WeatherFacadeService] 
})
export class WeatherModule { }
