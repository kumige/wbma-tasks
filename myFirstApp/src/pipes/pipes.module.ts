import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { FiltersPipe } from './filters/filters';
import { DescriptionPipe } from './description/description';
@NgModule({
	declarations: [ThumbnailPipe,
    FiltersPipe,
    DescriptionPipe],
	imports: [],
	exports: [ThumbnailPipe,
    FiltersPipe,
    DescriptionPipe]
})
export class PipesModule {}
