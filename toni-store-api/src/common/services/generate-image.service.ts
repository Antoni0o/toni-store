import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenerateImageService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(GenerateImageService.name);

  @Inject(ConfigService)
  private readonly config: ConfigService;

  async execute(imageName: string): Promise<string> {
    const { data } = await this.httpService.axiosRef.get(
      `https://pixabay.com/api/?key=${this.config.get<string>(
        'PIXABAY_API_KEY',
      )}&lang=pt&q=${imageName}&image_type=photo`,
    );

    if (data['hits'][0]) {
      return data['hits'][0]['webformatURL'];
    } else {
      return 'https://pixabay.com/get/g1079d6ad48c1c519550271ad9655ad24074544ce028857b9378ef81132876508a1f5567587c8497ffb47f62b59743f305835a2ae80ae9819e100fce8519c2706_640.jpg';
    }
  }
}
