import * as fg from 'fast-glob';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MasterFacility } from '../src/domain/master-facility.entity';
import { Facility } from '../src/domain/facility.entity';

const pattern = '**/*.seed.test.json';

const getFiles = async () => {
  let files: string[] = [];
  files = await fg([pattern], { dot: true });
  return files;
};

export const getTestMasterFacilities = async () => {
  const seedFiles = await getFiles();
  const fileToParse = seedFiles.find(f =>
    f.includes('master_facility'.toLowerCase()),
  );
  if (fileToParse) {
    Logger.log(`reading seed [${fileToParse}]`);
    const contents = fs.readFileSync(fileToParse).toString();
    const data: MasterFacility[] = JSON.parse(contents);
    return plainToClass(MasterFacility, data);
  }
  return [];
};

export const getTestFacilities = async () => {
  const seedFiles = await getFiles();
  const fileToParse = seedFiles.find(f =>
    f.includes('upload_facility'.toLowerCase()),
  );
  if (fileToParse) {
    Logger.log(`reading seed [${fileToParse}]`);
    const contents = fs.readFileSync(fileToParse).toString();
    const data: Facility[] = JSON.parse(contents);
    return plainToClass(Facility, data);
  }
  return [];
};
