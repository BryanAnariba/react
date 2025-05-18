import { Injectable } from '@nestjs/common';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { Band } from './entities/band.entity';
import { setUUID } from 'src/utils/uuid.utils';

@Injectable()
export class BandsService {
  public bands: Band[] = [
    { id: setUUID(), name: 'Jowel & Randy', votes: 0 },
    { id: setUUID(), name: 'Metallica', votes: 0 },
    { id: setUUID(), name: 'Linkin Park', votes: 0 },
    { id: setUUID(), name: 'kazabe', votes: 0 },
  ];

  create(createBandDto: CreateBandDto): Band {
    const band: Band = { id: setUUID(), name: createBandDto.name, votes: 0 };
    this.bands = [band, ...this.bands];
    return band;
  }

  findAll(): Band[] {
    return this.bands;
  }

  findOne(id: string) {
    return this.bands.find((band) => band.id === id);
  }

  update(id: string, updateBandDto: UpdateBandDto) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = `${updateBandDto.name}`;
      }
      return band;
    });
  }

  remove(id: string): void {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  increaseBandVotes(id: string): void {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes++;
      }
      return band;
    });
  }
}
