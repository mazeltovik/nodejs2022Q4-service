import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { db } from 'src/model/db';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './entities/track.entity';
import { checkUpdateTrackDto } from './helpers/checkUpdateTrackDto';

@Injectable()
export class TrackService {
  track: Track[] = db.track;
  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.track.push(track);
    return track;
  }

  findAll() {
    return this.track;
  }

  findOne(id: string) {
    const track = this.track.find((track) => track.id == id);
    if (track) {
      return track;
    } else {
      throw new NotFoundException('Track was not found.');
    }
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (checkUpdateTrackDto(updateTrackDto)) {
      const { name, artistId, albumId, duration } = updateTrackDto;
      const track = this.track.find((track) => track.id == id);
      if (track) {
        track.name = name ? name : track.name;
        track.duration = duration ? duration : track.duration;
        track.artistId = artistId ? artistId : track.artistId;
        track.albumId = albumId ? albumId : track.albumId;
        if (artistId !== undefined) {
          track.artistId = artistId;
        }
        if (artistId !== undefined) {
          track.artistId = artistId;
        }
        if (albumId !== undefined) {
          track.albumId = albumId;
        }
        // if (artistId) {
        //   track.artistId = artistId;
        // } else if (artistId == null) {
        //   track.artistId = artistId;
        // } else {
        //   track.artistId = track.artistId;
        // }
        // if (albumId) {
        //   track.albumId = albumId;
        // } else if (albumId == null) {
        //   track.albumId = albumId;
        // } else {
        //   track.albumId = track.albumId;
        // }
        return track;
      } else {
        throw new NotFoundException('Track was not found.');
      }
    } else {
      throw new BadRequestException('Invalid dto');
    }
  }

  remove(id: string) {
    const trackIndex = this.track.findIndex((track) => track.id == id);
    if (!~trackIndex) {
      throw new NotFoundException('Track was not found.');
    } else {
      // const favsTrackIndex = db.favs.tracks.findIndex((favTrack) => {
      //   favTrack == this.track[trackIndex].id;
      // });
      // db.favs.tracks.splice(favsTrackIndex, 1);
      this.track.splice(trackIndex, 1);
    }
  }
}
