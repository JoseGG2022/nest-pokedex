import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=100',
    );

    const pokemonToInsert: { name: string; numberPokemon: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const numberPokemon: number = +segments[segments.length - 2];
      pokemonToInsert.push({ name, numberPokemon });
    });
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed';
  }

  // async executeSeed() {
  //   await this.pokemonModel.deleteMany({});
  //   const { data } = await this.axios.get<PokeResponse>(
  //     'https://pokeapi.co/api/v2/pokemon?limit=15',
  //   );

  //   const insetPromiseArray = [];

  //   data.results.forEach(({ name, url }) => {
  //     const segments = url.split('/');
  //     const numberPokemon: number = +segments[segments.length - 2];
  //     insetPromiseArray.push(this.pokemonModel.create({ name, numberPokemon }));
  //   });
  //   await Promise.all(insetPromiseArray);
  //   return 'Seed executed';
  // }
}
