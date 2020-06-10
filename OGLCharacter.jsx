import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup
} from "reactstrap";
import confirm from 'reactstrap-confirm';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ReactTable from "react-table";
import { getRecord, listRecords, recordsByCreatedAt } from "../graphql/queries"
import { createRecord, updateRecord, deleteRecord } from "../graphql/mutations"
import { API, graphqlOperation, Auth } from "aws-amplify"
import queryString from 'query-string'

import ColorNavbar from "components/Navbars/ColorNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

const DND5ECharacter = (router) => {
  const [hash_key, setHashKey] = useState("")
  const [sort_key, setSortKey] = useState("")
  const animatedComponents = makeAnimated()

  useEffect(() => {
    document.body.classList.add("index-page");
  
    initialGet()

    return () => {
      document.body.classList.remove("index-page");
    }
  }, []) 

  const initialGet = async () => {
    const user = await Auth.currentAuthenticatedUser().catch(() => {
      router.history.push('/login-page')
    })

    const params = queryString.parse(router.location.search)
    const name = params.name
    if (!name) {
      router.history.push('/characters')
    }

    if (user) {
      const hash = 'CHARACTER#MEMBER#' + user.username 
      const sort = 'SYSTEM#DND5E#NAME#' + name
      setHashKey(hash)
      setSortKey(sort)

      const character_data = await API.graphql(graphqlOperation(getRecord, {
        hash_key: hash,
        sort_key: sort
      }))

      const record = character_data.data.getRecord
      if (record) {
        let data = JSON.parse(record.json)
        if (data) {
          for (const [property, value] of Object.entries(data)) {
            setCharacterProperty(property, value)
          }
        } else {
          toggleLevelUpModal()
        }
      } else {
        // do nothing
      }
    }
  }

  const [barbarian_level, setBarbiarianLevel] = useState(0)
  const [bard_level, setBardLevel] = useState(0)
  const [cleric_level, setClericLevel] = useState(0)
  const [druid_level, setDruidLevel] = useState(0)
  const [fighter_level, setFighterLevel] = useState(0)
  const [monk_level, setMonkLevel] = useState(0)
  const [paladin_level, setPaladinLevel] = useState(0)
  const [ranger_level, setRangerLevel] = useState(0)
  const [rogue_level, setRogueLevel] = useState(0)
  const [sorcerer_level, setSorcererLevel] = useState(0)
  const [warlock_level, setWarlockLevel] = useState(0)
  const [wizard_level, setWizardLevel] = useState(0)
  const [strength, setStrength] = useState("")
  const [dexterity, setDexterity] = useState("")
  const [constitution, setConstitution] = useState("")
  const [intelligence, setIntelligence] = useState("")
  const [wisdom, setWisdom] = useState("")
  const [charisma, setCharisma] = useState("")


  const [experience_points, setExperiencePoints] = useState("")

  const [inspiration, setInspiration] = useState("")
  const [proficiency_bonus, setProficiencyBonus] = useState("")

  const [passive_wisdom_perception, setPassiveWisdomPercention] = useState("")
  const [other_proficiencies_and_languages, setOtherProficienciesAndLanguages] = useState("")

  const [armor_class, setArmorClass] = useState("")
  const [initiative, setInitiative] = useState("")
  const [speed, setSpeed] = useState("")
  const [max_hp, setMaxHp] = useState("")
  const [current_hp, setCurrentHp] = useState("")
  const [temporary_hp, setTemporaryHp] = useState("")
  const [hit_dice, setHitDice] = useState("")
  const [total_hit_dice, setTotalHitDice] = useState("")
  const [death_save_successes, setDeathSaveSuccesses] = useState("")
  const [death_save_fails, setDeathSaveFails] = useState("")

  const [attacks_and_spellcasting, setAttacksAndSpellcasting] = useState("")

  const [money, setMoney] = useState("")
  const [equipment, setEquipment] = useState("")
  const [personality_traits, setPersonalityTraits] = useState("")

  const [features_and_traits, setFeaturesAndTraits] = useState("")

  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [eyes, setEyes] = useState("")
  const [skin, setSkin] = useState("")
  const [hair, setHair] = useState("")

  const [appearance, setAppearance] = useState("")
  const [backstory, setBackstory] = useState("")
  const [allies_and_organizations, setAlliesAndOrganizations] = useState("")
  const [additional_features_and_traits, setAdditionalFeaturesAndTraits] = useState("")
  const [treasure, setTreasure] = useState("")

  const [spellcasting_class, setSpellcastingClass] = useState("")
  const [spellcasting_ability, setSpellcastingAbility] = useState("")
  const [spell_save_dc, setSpellSaveDc] = useState("")
  const [spell_attack_bonus, setSpellAttackBonus] = useState("")
  const [spells, setSpells] = useState("")

  const DND5E_CONTROLS = [
    "race",
    "char_classes",
    "primary_class_feature",
    "sorcerer_origin",
    "background",
    "alignment",
    "pronoun",
    "personality_trait",
    "ideal",
    "bond",
    "flaw",
    "experience_points",
    "inspiration",
    "proficiency_bonus",
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
    "acrobatics_dex",
    "animal_handling_wis",
    "arcana_int",
    "athletics_str",
    "deception_cha",
    "history_int",
    "insight_wis",
    "intimidation_cha",
    "investigation_int",
    "medicine_wis",
    "nature_int",
    "perception_wis",
    "performance_cha",
    "persuasion_cha",
    "religion_int",
    "sleight_of_hand_dex",
    "stealth_dex",
    "survival_wis",
    "passive_wisdom_perception",
    "other_proficiencies_and_languages",
    "armor_class",
    "initiative",
    "speed",
    "max_hp",
    "current_hp",
    "temporary_hp",
    "hit_dice",
    "total_hit_dice",
    "death_save_successes",
    "death_save_fails",
    "attacks_and_spellcasting",
    "money",
    "equipment",
    "personality_traits",
    "ideals",
    "bonds",
    "flaws",
    "features_and_traits",
    "age",
    "height",
    "weight",
    "eyes",
    "skin",
    "hair",
    "appearance",
    "backstory",
    "allies_and_organizations",
    "additional_features_and_traits",
    "treasure",
    "spellcasting_class",
    "spellcasting_ability",
    "spell_save_dc",
    "spell_attack_bonus",
    "spells",
    "warlock_pact_boon",
    "warlock_pact_tome_cantrips",
    "warlock_patron",
  ]
  
  const setCharacterProperty = (property, value) => {
    switch(property) {
      case "race": setRace(value); break;
      case "char_classes": setCharClasses(value); break;
      case "primary_class_feature": setPrimaryClassFeature(value); break;
      case "sorcerer_origin": setSorcererOrigin(value); break;
      case "background": setBackground(value); break;
      case "alignment": setAlignment(value); break;
      case "pronoun": setPronoun(value); break;
      case "personality_trait": setPersonalityTrait(value); break;
      case "ideal": setIdeal(value); break;
      case "bond": setBond(value); break;
      case "flaw": setFlaw(value); break;
      case "experience_points": setExperiencePoints(value); break;
      case "inspiration": setInspiration(value); break;
      case "proficiency_bonus": setProficiencyBonus(value); break;
      case "strength": setStrength(value); break;
      case "dexterity": setDexterity(value); break;
      case "constitution": setConstitution(value); break;
      case "intelligence": setIntelligence(value); break;
      case "wisdom": setWisdom(value); break;
      case "charisma": setCharisma(value); break;
      case "acrobatics_dex": setAcrobaticsDex(value); break;
      case "animal_handling_wis": setAnimalHandlingWis(value); break;
      case "arcana_int": setArcanaInt(value); break;
      case "athletics_str": setAthleticsStr(value); break;
      case "deception_cha": setDeceptionCha(value); break;
      case "history_int": setHistoryInt(value); break;
      case "insight_wis": setInstightWis(value); break;
      case "intimidation_cha": setIntimidationCha(value); break;
      case "investigation_int": setInvestigationInt(value); break;
      case "medicine_wis": setMedicineWis(value); break;
      case "nature_int": setNatureInt(value); break;
      case "perception_wis": setPerceptionWis(value); break;
      case "performance_cha": setPerformanceCha(value); break;
      case "persuasion_cha": setPersuasionCha(value); break;
      case "religion_int": setReligionInt(value); break;
      case "sleight_of_hand_dex": setSlightOfHandDex(value); break;
      case "stealth_dex": setStealthDex(value); break;
      case "survival_wis": setSurvivalWis(value); break;
      case "passive_wisdom_perception": setPassiveWisdomPercention(value); break;
      case "other_proficiencies_and_languages": setOtherProficienciesAndLanguages(value); break;
      case "armor_class": setArmorClass(value); break;
      case "initiative": setInitiative(value); break;
      case "speed": setSpeed(value); break;
      case "max_hp": setMaxHp(value); break;
      case "current_hp": setCurrentHp(value); break;
      case "temporary_hp": setTemporaryHp(value); break;
      case "hit_dice": setHitDice(value); break;
      case "total_hit_dice": setTotalHitDice(value); break;
      case "death_save_successes": setDeathSaveSuccesses(value); break;
      case "death_save_fails": setDeathSaveFails(value); break;
      case "attacks_and_spellcasting": setAttacksAndSpellcasting(value); break;
      case "money": setMoney(value); break;
      case "equipment": setEquipment(value); break;
      case "features_and_traits": setFeaturesAndTraits(value); break;
      case "age": setAge(value); break;
      case "height": setHeight(value); break;
      case "weight": setWeight(value); break;
      case "eyes": setEyes(value); break;
      case "skin": setSkin(value); break;
      case "hair": setHair(value); break;
      case "appearance": setAppearance(value); break;
      case "backstory": setBackstory(value); break;
      case "allies_and_organizations": setAlliesAndOrganizations(value); break;
      case "additional_features_and_traits": setAdditionalFeaturesAndTraits(value); break;
      case "treasure": setTreasure(value); break;
      case "spellcasting_class": setSpellcastingClass(value); break;
      case "spellcasting_ability": setSpellcastingAbility(value); break;
      case "spell_save_dc": setSpellSaveDc(value); break;
      case "spell_attack_bonus": setSpellAttackBonus(value); break;
      case "spells": setSpells(value); break;
      case "warlock_pact_boon": setWarlockPactBoon(value); break;
      case "warlock_pact_tome_cantrips": setWarlockPactTomeCantrips(value); break;
      case "warlock_patron": setWarlockPatron(value); break;
      default: console.log("No character property to set: " + property);
    }
  }

  const getCharacterProperty = (property) => {
    switch(property) {
      case "race": return race
      case "char_classes": return char_classes
      case "sorcerer_origin": return sorcerer_origin
      case "primary_class_feature": return primary_class_feature
      case "background": return background
      case "alignment": return alignment
      case "pronoun": return pronoun
      case "personality_trait": return personality_trait
      case "ideal": return ideal
      case "bond": return bond
      case "flaw": return flaw
      case "experience_points": return experience_points
      case "inspiration": return inspiration
      case "proficiency_bonus": return proficiency_bonus
      case "strength": return strength
      case "dexterity": return dexterity
      case "constitution": return constitution
      case "intelligence": return intelligence
      case "wisdom": return wisdom
      case "charisma": return charisma
      case "acrobatics_dex": return acrobatics_dex
      case "animal_handling_wis": return animal_handling_wis
      case "arcana_int": return arcana_int
      case "athletics_str": return athletics_str
      case "deception_cha": return deception_cha
      case "history_int": return history_int
      case "insight_wis": return insight_wis
      case "intimidation_cha": return intimidation_cha
      case "investigation_int": return investigation_int
      case "medicine_wis": return medicine_wis
      case "nature_int": return nature_int
      case "perception_wis": return perception_wis
      case "performance_cha": return performance_cha
      case "persuasion_cha": return persuasion_cha
      case "religion_int": return religion_int
      case "sleight_of_hand_dex": return sleight_of_hand_dex
      case "stealth_dex": return stealth_dex
      case "survival_wis": return survival_wis
      case "passive_wisdom_perception": return passive_wisdom_perception
      case "other_proficiencies_and_languages": return other_proficiencies_and_languages
      case "armor_class": return armor_class
      case "initiative": return initiative
      case "speed": return speed
      case "max_hp": return max_hp
      case "current_hp": return current_hp
      case "temporary_hp": return temporary_hp
      case "hit_dice": return hit_dice
      case "total_hit_dice": return total_hit_dice
      case "death_save_successes": return death_save_successes
      case "death_save_fails": return death_save_fails
      case "attacks_and_spellcasting": return attacks_and_spellcasting
      case "money": return money
      case "equipment": return equipment
      case "features_and_traits": return features_and_traits
      case "age": return age
      case "height": return height
      case "weight": return weight
      case "eyes": return eyes
      case "skin": return skin
      case "hair": return hair
      case "appearance": return appearance
      case "backstory": return backstory
      case "allies_and_organizations": return allies_and_organizations
      case "additional_features_and_traits": return additional_features_and_traits
      case "treasure": return treasure
      case "spellcasting_class": return spellcasting_class
      case "spellcasting_ability": return spellcasting_ability
      case "spell_save_dc": return spell_save_dc
      case "spell_attack_bonus": return spell_attack_bonus
      case "spells": return spells
      case "warlock_pact_boon": return warlock_pact_boon
      case "warlock_pact_tome_cantrips": return warlock_pact_tome_cantrips
      case "warlock_patron": return warlock_patron
      default: console.log("No character property to get: " + property);
    }
  }

  const CLASSES = [
    { label: "Barbarian", value: "Barbarian", hit_die: 12, hp_per_level: 7, str: 15, dex: 8,  con: 15, int: 8,  wis: 15, cha: 8 },
    { label: "Bard",      value: "Bard",      hit_die: 8,  hp_per_level: 5, str: 8,  dex: 14, con: 14, int: 8,  wis: 12, cha: 15 },
    { label: "Cleric",    value: "Cleric",    hit_die: 8,  hp_per_level: 5, str: 14, dex: 8,  con: 14, int: 8,  wis: 15, cha: 12 },
    { label: "Druid",     value: "Druid",     hit_die: 8,  hp_per_level: 5, str: 8,  dex: 8,  con: 15, int: 15, wis: 15, cha: 8 },
    { label: "Fighter",   value: "Fighter",   hit_die: 10, hp_per_level: 6, str: 15, dex: 14, con: 14, int: 12, wis: 8,  cha: 8 },
    { label: "Monk",      value: "Monk",      hit_die: 8,  hp_per_level: 5, str: 12, dex: 15, con: 14, int: 8,  wis: 14, cha: 8 },
    { label: "Paladin",   value: "Paladin",   hit_die: 10, hp_per_level: 6, str: 15, dex: 8,  con: 13, int: 8,  wis: 12, cha: 15 },
    { label: "Ranger",    value: "Ranger",    hit_die: 10, hp_per_level: 6, str: 14, dex: 15, con: 12, int: 8,  wis: 14, cha: 8 },
    { label: "Rogue",     value: "Rogue",     hit_die: 8,  hp_per_level: 5, str: 8,  dex: 15, con: 14, int: 14, wis: 8,  cha: 12 },
    { label: "Sorcerer",  value: "Sorcerer",  hit_die: 6,  hp_per_level: 4, str: 8,  dex: 8,  con: 15, int: 12, wis: 13, cha: 15 },
    { label: "Warlock",   value: "Warlock",   hit_die: 8,  hp_per_level: 5, str: 8,  dex: 8,  con: 15, int: 8,  wis: 15, cha: 15 },
    { label: "Wizard",    value: "Wizard",    hit_die: 6,  hp_per_level: 4, str: 8,  dex: 12, con: 14, int: 15, wis: 13, cha: 10 }
  ]
  const [char_classes, setCharClasses] = useState([])
  const [level_up_class, setLevelUpClass] = useState([])
  useEffect(() => {
    let label_data = {"Barbarian": 0, "Bard": 0, "Cleric": 0, "Druid": 0, "Fighter": 0, "Monk": 0, "Paladin": 0, "Ranger": 0, "Rogue": 0, "Sorcerer": 0, "Warlock": 0, "Wizard": 0}
      
    if (char_classes.length > 0) {
      char_classes.forEach( char_class => {
        label_data[char_class] += 1
      })
    } 

    for (var key in label_data) {
      switch(key) {
        case "Barbarian": setBarbiarianLevel(label_data[key]); break
        case "Bard": setBardLevel(label_data[key]); break
        case "Cleric": setClericLevel(label_data[key]); break
        case "Druid": setDruidLevel(label_data[key]); break
        case "Fighter": setFighterLevel(label_data[key]); break
        case "Monk": setMonkLevel(label_data[key]); break
        case "Paladin": setPaladinLevel(label_data[key]); break
        case "Ranger": setRangerLevel(label_data[key]); break
        case "Rogue": setRogueLevel(label_data[key]); break
        case "Sorcerer": setSorcererLevel(label_data[key]); break
        case "Warlock": setWarlockLevel(label_data[key]); break
        case "Wizard": setWizardLevel(label_data[key]); break
        default: break
      }
    } 
  }, [char_classes])

  const RACES = [
    { label: "Hill Dwarf",         value: "Hill Dwarf",         hp_per_level: 1, str: 0, dex: 0, con: 2, int: 0, wis: 1, cha: 0 },
    { label: "Mountain Dwarf",     value: "Mountain Dwarf",     hp_per_level: 0, str: 2, dex: 0, con: 2, int: 0, wis: 1, cha: 0 },
    { label: "High Elf",           value: "High Elf",           hp_per_level: 0, str: 0, dex: 2, con: 0, int: 1, wis: 0, cha: 0 },
    { label: "Wood Elf",           value: "Wood Elf",           hp_per_level: 0, str: 0, dex: 2, con: 0, int: 0, wis: 1, cha: 0 },
    { label: "Dark Elf",           value: "Dark Elf",           hp_per_level: 0, str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 1 },
    { label: "Lightfoot Halfling", value: "Lightfoot Halfling", hp_per_level: 0, str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 1 },
    { label: "Stout Halfling",     value: "Stout Halfling",     hp_per_level: 0, str: 0, dex: 2, con: 1, int: 0, wis: 0, cha: 0 },
    { label: "Human",              value: "Human",              hp_per_level: 0, str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    { label: "Dragonborn",         value: "Dragonborn",         hp_per_level: 0, str: 2, dex: 0, con: 0, int: 0, wis: 0, cha: 1 },
    { label: "Forest Gnome",       value: "Forest Gnome",       hp_per_level: 0, str: 0, dex: 1, con: 0, int: 2, wis: 0, cha: 0 },
    { label: "Rock Gnome",         value: "Rock Gnome",         hp_per_level: 0, str: 0, dex: 0, con: 1, int: 2, wis: 0, cha: 0 },
    { label: "Half Elf",           value: "High Elf",           hp_per_level: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 2 },
    { label: "Half Orc",           value: "Half Orc",           hp_per_level: 0, str: 2, dex: 0, con: 1, int: 0, wis: 0, cha: 0 },
    { label: "Tiefling",           value: "Tiefling",           hp_per_level: 0, str: 0, dex: 0, con: 0, int: 1, wis: 0, cha: 2 },
  ]
  const [race, setRace] = useState([])

  const ALIGNMENTS = [
    { label: "Lawful Good", value: "Lawful Good" },
    { label: "Lawful Neutral", value: "Lawful Neutral" },
    { label: "Lawful Evil", value: "Lawful Evil" },
    { label: "Neutral Good", value: "Neutral Good" },
    { label: "True Neutral", value: "True Neutral" },
    { label: "Neutral Evil", value: "Neutral Evil" },
    { label: "Chaotic Good", value: "Chaotic Good" },
    { label: "Chaotic Neutral", value: "Chaotic Neutral" },
    { label: "Chaotic Evil", value: "Chaotic Evil" }
  ]
  const [alignment, setAlignment] = useState("")

  const BACKGROUNDS = [
    { label: "Acolyte", value: "Acolyte" },
    { label: "Charlatan", value: "Charlatan" },
    { label: "Criminal", value: "Criminal" },
    { label: "Entertainer", value: "Entertainer" },
    { label: "Folk Hero", value: "Folk Hero" },
    { label: "Guild Artisan", value: "Guild Artisan" },
    { label: "Hermit", value: "Hermit" },
    { label: "Noble", value: "Noble" },
    { label: "Outlander", value: "Outlander" }, 
    { label: "Sage", value: "Sage" },
    { label: "Sailor", value: "Sailor" },
    { label: "Soldier", value: "Soldier" },
    { label: "Urchin", value: "Urchin" }  
  ]
  const [background, setBackground] = useState("")

  const PRONOUNS = [
    {label: "He/Him", value: "He/Him"},
    {label: "She/Her", value: "She/Her"},
    {label: "They/Their", value: "They/Their"},
    {label: "It/Its", value: "It/Its"}
  ]
  const [pronoun, setPronoun] = useState("")

  const PERSONALITY_TRAITS = [
    { background: "Acolyte", value: 1, label: "I idolize a particular hero of my faith, and constantly refer to that person's deeds and example." },
    { background: "Acolyte", value: 2, label: "" },
    { background: "Acolyte", value: 3, label: "" },
    { background: "Acolyte", value: 4, label: "" },
    { background: "Acolyte", value: 5, label: "" },
    { background: "Acolyte", value: 6, label: "" },
    { background: "Charlatan", value: 1, label: ""  },
    { background: "Charlatan", value: 2, label: ""  },
    { background: "Charlatan", value: 3, label: ""  },
    { background: "Charlatan", value: 4, label: ""  },
    { background: "Charlatan", value: 5, label: ""  },
    { background: "Charlatan", value: 6, label: ""  },
    { background: "Criminal", value: 1, label: ""  },
    { background: "Criminal", value: 2, label: ""  },
    { background: "Criminal", value: 3, label: ""  },
    { background: "Criminal", value: 4, label: ""  },
    { background: "Criminal", value: 5, label: ""  },
    { background: "Criminal", value: 6, label: ""  },
    { background: "Entertainer", value: 1, label: ""  },
    { background: "Entertainer", value: 2, label: ""  },
    { background: "Entertainer", value: 3, label: ""  },
    { background: "Entertainer", value: 4, label: ""  },
    { background: "Entertainer", value: 5, label: ""  },
    { background: "Entertainer", value: 6, label: ""  },
    { background: "Folk Hero", value: 1, label: ""  },
    { background: "Folk Hero", value: 2, label: ""  },
    { background: "Folk Hero", value: 3, label: ""  },
    { background: "Folk Hero", value: 4, label: ""  },
    { background: "Folk Hero", value: 5, label: ""  },
    { background: "Folk Hero", value: 6, label: ""  },
    { background: "Guild Artisan", value: 1, label: ""  },
    { background: "Guild Artisan", value: 2, label: ""  },
    { background: "Guild Artisan", value: 3, label: ""  },
    { background: "Guild Artisan", value: 4, label: ""  },
    { background: "Guild Artisan", value: 5, label: ""  },
    { background: "Guild Artisan", value: 6, label: ""  },
    { background: "Hermit", value: 1, label: ""  },
    { background: "Hermit", value: 2, label: ""  },
    { background: "Hermit", value: 3, label: ""  },
    { background: "Hermit", value: 4, label: ""  },
    { background: "Hermit", value: 5, label: ""  },
    { background: "Hermit", value: 6, label: ""  },
    { background: "Noble", value: 1, label: "" },
    { background: "Noble", value: 2, label: "" },
    { background: "Noble", value: 3, label: "" },
    { background: "Noble", value: 4, label: "" },
    { background: "Noble", value: 5, label: "" },
    { background: "Noble", value: 6, label: "" },
    { background: "Outlander", value: 1, label: ""  }, 
    { background: "Outlander", value: 2, label: ""  },
    { background: "Outlander", value: 3, label: ""  },
    { background: "Outlander", value: 4, label: ""  },
    { background: "Outlander", value: 5, label: ""  },
    { background: "Outlander", value: 6, label: ""  },
    { background: "Sage", value: 1, label: ""  },
    { background: "Sage", value: 2, label: ""  },
    { background: "Sage", value: 3, label: ""  },
    { background: "Sage", value: 4, label: ""  },
    { background: "Sage", value: 5, label: ""  },
    { background: "Sage", value: 6, label: ""  },
    { background: "Sailor", value: 1, label: ""  },
    { background: "Sailor", value: 2, label: ""  },
    { background: "Sailor", value: 3, label: ""  },
    { background: "Sailor", value: 4, label: ""  },
    { background: "Sailor", value: 5, label: ""  },
    { background: "Sailor", value: 6, label: ""  },
    { background: "Soldier", value: 1, label: ""  },
    { background: "Soldier", value: 2, label: ""  },
    { background: "Soldier", value: 3, label: ""  },
    { background: "Soldier", value: 4, label: ""  },
    { background: "Soldier", value: 5, label: ""  },
    { background: "Soldier", value: 6, label: ""  },
    { background: "Urchin", value: 1, label: ""  },
    { background: "Urchin", value: 2, label: ""  },
    { background: "Urchin", value: 3, label: ""  },
    { background: "Urchin", value: 4, label: ""  },
    { background: "Urchin", value: 5, label: ""  },
    { background: "Urchin", value: 6, label: ""  }
  ]
  const IDEALS = [
    { background: "Acolyte", value: 1, label: "" },
    { background: "Acolyte", value: 2, label: "" },
    { background: "Acolyte", value: 3, label: "" },
    { background: "Acolyte", value: 4, label: "" },
    { background: "Acolyte", value: 5, label: "" },
    { background: "Acolyte", value: 6, label: "" },
    { background: "Charlatan", value: 1, label: ""  },
    { background: "Charlatan", value: 2, label: ""  },
    { background: "Charlatan", value: 3, label: ""  },
    { background: "Charlatan", value: 4, label: ""  },
    { background: "Charlatan", value: 5, label: ""  },
    { background: "Charlatan", value: 6, label: ""  },
    { background: "Criminal", value: 1, label: ""  },
    { background: "Criminal", value: 2, label: ""  },
    { background: "Criminal", value: 3, label: ""  },
    { background: "Criminal", value: 4, label: ""  },
    { background: "Criminal", value: 5, label: ""  },
    { background: "Criminal", value: 6, label: ""  },
    { background: "Entertainer", value: 1, label: ""  },
    { background: "Entertainer", value: 2, label: ""  },
    { background: "Entertainer", value: 3, label: ""  },
    { background: "Entertainer", value: 4, label: ""  },
    { background: "Entertainer", value: 5, label: ""  },
    { background: "Entertainer", value: 6, label: ""  },
    { background: "Folk Hero", value: 1, label: ""  },
    { background: "Folk Hero", value: 2, label: ""  },
    { background: "Folk Hero", value: 3, label: ""  },
    { background: "Folk Hero", value: 4, label: ""  },
    { background: "Folk Hero", value: 5, label: ""  },
    { background: "Folk Hero", value: 6, label: ""  },
    { background: "Guild Artisan", value: 1, label: ""  },
    { background: "Guild Artisan", value: 2, label: ""  },
    { background: "Guild Artisan", value: 3, label: ""  },
    { background: "Guild Artisan", value: 4, label: ""  },
    { background: "Guild Artisan", value: 5, label: ""  },
    { background: "Guild Artisan", value: 6, label: ""  },
    { background: "Hermit", value: 1, label: ""  },
    { background: "Hermit", value: 2, label: ""  },
    { background: "Hermit", value: 3, label: ""  },
    { background: "Hermit", value: 4, label: ""  },
    { background: "Hermit", value: 5, label: ""  },
    { background: "Hermit", value: 6, label: ""  },
    { background: "Noble", value: 1, label: "" },
    { background: "Noble", value: 2, label: "" },
    { background: "Noble", value: 3, label: "" },
    { background: "Noble", value: 4, label: "" },
    { background: "Noble", value: 5, label: "" },
    { background: "Noble", value: 6, label: "" },
    { background: "Outlander", value: 1, label: ""  }, 
    { background: "Outlander", value: 2, label: ""  },
    { background: "Outlander", value: 3, label: ""  },
    { background: "Outlander", value: 4, label: ""  },
    { background: "Outlander", value: 5, label: ""  },
    { background: "Outlander", value: 6, label: ""  },
    { background: "Sage", value: 1, label: ""  },
    { background: "Sage", value: 2, label: ""  },
    { background: "Sage", value: 3, label: ""  },
    { background: "Sage", value: 4, label: ""  },
    { background: "Sage", value: 5, label: ""  },
    { background: "Sage", value: 6, label: ""  },
    { background: "Sailor", value: 1, label: ""  },
    { background: "Sailor", value: 2, label: ""  },
    { background: "Sailor", value: 3, label: ""  },
    { background: "Sailor", value: 4, label: ""  },
    { background: "Sailor", value: 5, label: ""  },
    { background: "Sailor", value: 6, label: ""  },
    { background: "Soldier", value: 1, label: ""  },
    { background: "Soldier", value: 2, label: ""  },
    { background: "Soldier", value: 3, label: ""  },
    { background: "Soldier", value: 4, label: ""  },
    { background: "Soldier", value: 5, label: ""  },
    { background: "Soldier", value: 6, label: ""  },
    { background: "Urchin", value: 1, label: ""  },
    { background: "Urchin", value: 2, label: ""  },
    { background: "Urchin", value: 3, label: ""  },
    { background: "Urchin", value: 4, label: ""  },
    { background: "Urchin", value: 5, label: ""  },
    { background: "Urchin", value: 6, label: ""  }
  ]
  const BONDS = [
    { background: "Acolyte", value: 1, label: "" },
    { background: "Acolyte", value: 2, label: "" },
    { background: "Acolyte", value: 3, label: "" },
    { background: "Acolyte", value: 4, label: "" },
    { background: "Acolyte", value: 5, label: "" },
    { background: "Acolyte", value: 6, label: "" },
    { background: "Charlatan", value: 1, label: ""  },
    { background: "Charlatan", value: 2, label: ""  },
    { background: "Charlatan", value: 3, label: ""  },
    { background: "Charlatan", value: 4, label: ""  },
    { background: "Charlatan", value: 5, label: ""  },
    { background: "Charlatan", value: 6, label: ""  },
    { background: "Criminal", value: 1, label: ""  },
    { background: "Criminal", value: 2, label: ""  },
    { background: "Criminal", value: 3, label: ""  },
    { background: "Criminal", value: 4, label: ""  },
    { background: "Criminal", value: 5, label: ""  },
    { background: "Criminal", value: 6, label: ""  },
    { background: "Entertainer", value: 1, label: ""  },
    { background: "Entertainer", value: 2, label: ""  },
    { background: "Entertainer", value: 3, label: ""  },
    { background: "Entertainer", value: 4, label: ""  },
    { background: "Entertainer", value: 5, label: ""  },
    { background: "Entertainer", value: 6, label: ""  },
    { background: "Folk Hero", value: 1, label: ""  },
    { background: "Folk Hero", value: 2, label: ""  },
    { background: "Folk Hero", value: 3, label: ""  },
    { background: "Folk Hero", value: 4, label: ""  },
    { background: "Folk Hero", value: 5, label: ""  },
    { background: "Folk Hero", value: 6, label: ""  },
    { background: "Guild Artisan", value: 1, label: ""  },
    { background: "Guild Artisan", value: 2, label: ""  },
    { background: "Guild Artisan", value: 3, label: ""  },
    { background: "Guild Artisan", value: 4, label: ""  },
    { background: "Guild Artisan", value: 5, label: ""  },
    { background: "Guild Artisan", value: 6, label: ""  },
    { background: "Hermit", value: 1, label: ""  },
    { background: "Hermit", value: 2, label: ""  },
    { background: "Hermit", value: 3, label: ""  },
    { background: "Hermit", value: 4, label: ""  },
    { background: "Hermit", value: 5, label: ""  },
    { background: "Hermit", value: 6, label: ""  },
    { background: "Noble", value: 1, label: "" },
    { background: "Noble", value: 2, label: "" },
    { background: "Noble", value: 3, label: "" },
    { background: "Noble", value: 4, label: "" },
    { background: "Noble", value: 5, label: "" },
    { background: "Noble", value: 6, label: "" },
    { background: "Outlander", value: 1, label: ""  }, 
    { background: "Outlander", value: 2, label: ""  },
    { background: "Outlander", value: 3, label: ""  },
    { background: "Outlander", value: 4, label: ""  },
    { background: "Outlander", value: 5, label: ""  },
    { background: "Outlander", value: 6, label: ""  },
    { background: "Sage", value: 1, label: ""  },
    { background: "Sage", value: 2, label: ""  },
    { background: "Sage", value: 3, label: ""  },
    { background: "Sage", value: 4, label: ""  },
    { background: "Sage", value: 5, label: ""  },
    { background: "Sage", value: 6, label: ""  },
    { background: "Sailor", value: 1, label: ""  },
    { background: "Sailor", value: 2, label: ""  },
    { background: "Sailor", value: 3, label: ""  },
    { background: "Sailor", value: 4, label: ""  },
    { background: "Sailor", value: 5, label: ""  },
    { background: "Sailor", value: 6, label: ""  },
    { background: "Soldier", value: 1, label: ""  },
    { background: "Soldier", value: 2, label: ""  },
    { background: "Soldier", value: 3, label: ""  },
    { background: "Soldier", value: 4, label: ""  },
    { background: "Soldier", value: 5, label: ""  },
    { background: "Soldier", value: 6, label: ""  },
    { background: "Urchin", value: 1, label: ""  },
    { background: "Urchin", value: 2, label: ""  },
    { background: "Urchin", value: 3, label: ""  },
    { background: "Urchin", value: 4, label: ""  },
    { background: "Urchin", value: 5, label: ""  },
    { background: "Urchin", value: 6, label: ""  }
  ]
  const FLAWS = [
    { background: "Acolyte", value: 1, label: "" },
    { background: "Acolyte", value: 2, label: "" },
    { background: "Acolyte", value: 3, label: "" },
    { background: "Acolyte", value: 4, label: "" },
    { background: "Acolyte", value: 5, label: "" },
    { background: "Acolyte", value: 6, label: "" },
    { background: "Charlatan", value: 1, label: ""  },
    { background: "Charlatan", value: 2, label: ""  },
    { background: "Charlatan", value: 3, label: ""  },
    { background: "Charlatan", value: 4, label: ""  },
    { background: "Charlatan", value: 5, label: ""  },
    { background: "Charlatan", value: 6, label: ""  },
    { background: "Criminal", value: 1, label: ""  },
    { background: "Criminal", value: 2, label: ""  },
    { background: "Criminal", value: 3, label: ""  },
    { background: "Criminal", value: 4, label: ""  },
    { background: "Criminal", value: 5, label: ""  },
    { background: "Criminal", value: 6, label: ""  },
    { background: "Entertainer", value: 1, label: ""  },
    { background: "Entertainer", value: 2, label: ""  },
    { background: "Entertainer", value: 3, label: ""  },
    { background: "Entertainer", value: 4, label: ""  },
    { background: "Entertainer", value: 5, label: ""  },
    { background: "Entertainer", value: 6, label: ""  },
    { background: "Folk Hero", value: 1, label: ""  },
    { background: "Folk Hero", value: 2, label: ""  },
    { background: "Folk Hero", value: 3, label: ""  },
    { background: "Folk Hero", value: 4, label: ""  },
    { background: "Folk Hero", value: 5, label: ""  },
    { background: "Folk Hero", value: 6, label: ""  },
    { background: "Guild Artisan", value: 1, label: ""  },
    { background: "Guild Artisan", value: 2, label: ""  },
    { background: "Guild Artisan", value: 3, label: ""  },
    { background: "Guild Artisan", value: 4, label: ""  },
    { background: "Guild Artisan", value: 5, label: ""  },
    { background: "Guild Artisan", value: 6, label: ""  },
    { background: "Hermit", value: 1, label: ""  },
    { background: "Hermit", value: 2, label: ""  },
    { background: "Hermit", value: 3, label: ""  },
    { background: "Hermit", value: 4, label: ""  },
    { background: "Hermit", value: 5, label: ""  },
    { background: "Hermit", value: 6, label: ""  },
    { background: "Noble", value: 1, label: "" },
    { background: "Noble", value: 2, label: "" },
    { background: "Noble", value: 3, label: "" },
    { background: "Noble", value: 4, label: "" },
    { background: "Noble", value: 5, label: "" },
    { background: "Noble", value: 6, label: "" },
    { background: "Outlander", value: 1, label: ""  }, 
    { background: "Outlander", value: 2, label: ""  },
    { background: "Outlander", value: 3, label: ""  },
    { background: "Outlander", value: 4, label: ""  },
    { background: "Outlander", value: 5, label: ""  },
    { background: "Outlander", value: 6, label: ""  },
    { background: "Sage", value: 1, label: ""  },
    { background: "Sage", value: 2, label: ""  },
    { background: "Sage", value: 3, label: ""  },
    { background: "Sage", value: 4, label: ""  },
    { background: "Sage", value: 5, label: ""  },
    { background: "Sage", value: 6, label: ""  },
    { background: "Sailor", value: 1, label: ""  },
    { background: "Sailor", value: 2, label: ""  },
    { background: "Sailor", value: 3, label: ""  },
    { background: "Sailor", value: 4, label: ""  },
    { background: "Sailor", value: 5, label: ""  },
    { background: "Sailor", value: 6, label: ""  },
    { background: "Soldier", value: 1, label: ""  },
    { background: "Soldier", value: 2, label: ""  },
    { background: "Soldier", value: 3, label: ""  },
    { background: "Soldier", value: 4, label: ""  },
    { background: "Soldier", value: 5, label: ""  },
    { background: "Soldier", value: 6, label: ""  },
    { background: "Urchin", value: 1, label: ""  },
    { background: "Urchin", value: 2, label: ""  },
    { background: "Urchin", value: 3, label: ""  },
    { background: "Urchin", value: 4, label: ""  },
    { background: "Urchin", value: 5, label: ""  },
    { background: "Urchin", value: 6, label: ""  }
  ]
  const [filtered_personality_traits, setFilteredPersonalityTraits] = useState([])
  const [filtered_ideals, setFilteredIdeals] = useState([])
  const [filtered_bonds, setFilteredBonds] = useState([])
  const [filtered_flaws, setFilteredFlaws] = useState([])
  const [personality_trait, setPersonalityTrait] = useState([])
  const [ideal, setIdeal] = useState([])
  const [bond, setBond] = useState([])
  const [flaw, setFlaw] = useState([])
  useEffect(() => {
    setFilteredPersonalityTraits(PERSONALITY_TRAITS.filter(trait => (trait["background"] === background.value)))
    setFilteredIdeals(IDEALS.filter(ideal => (ideal["background"] === background.value)))
    setFilteredBonds(BONDS.filter(bond => (bond["background"] === background.value)))
    setFilteredFlaws(FLAWS.filter(flaw => (flaw["background"] === background.value)))
  },[background])

  const SPELLS = [
    { value: "Acid Splash", label: "Acid Splash", level: 0, flags: ["Sorcerer", "Wizard"] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] },
    { value: "", label: "", level: 0, flags: [""] }
  ]

  const ARMOR = [
    {label: "Padded", value: "Padded", type: "Light", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8},
    {label: "", value: "", type: "", ac: 11, plus_dex: true, dex_max: false, str_min: 0, stealth_disadvantage: true, cost_gp: 5, weight_lb: 8}
  ]

  const WEAPONS = [
    {label: "Club", value: "Club", type: "Simple", cost_gp: 0.1, damage:"1d4", damage_type: "bludgeoning", weight_lb: 2, properties: ["Light"]},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Simple", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []},
    {label: "", value: "", type: "Martial", cost_gp: 0, damage:"", damage_type: "", weight_lb: 2, properties: []}
  ]

  const ADVENTURING_GEAR = [
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0}
  ]

  const TOOLS = [
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0},
    {label: "", value: "", cost_gp: 0, weight_lb: 0}
  ]

  const PRIMARY_CLASS_FEATURES = [
    { label: "Path of the Berserker", value: "Path of the Berserker", char_class: "Barbarian", level: 3},
    { label: "Path of the Totem Warrior", value: "Path of the Totem Warrior", char_class: "Barbarian", level: 3},
    { label: "College of Lore", value: "College of Lore", char_class: "Bard", level: 3},
    { label: "College of Valor", value: "College of Valor", char_class: "Bard", level: 3},
    { label: "Knowledge Domain", value: "Knowledge Domain", char_class: "Cleric", level: 1 },
    { label: "Life Domain", value: "Life Domain", char_class: "Cleric", level: 1 },
    { label: "Light Domain", value: "Light Domain", char_class: "Cleric", level: 1 },
    { label: "Nature Domain", value: "Nature Domain", char_class: "Cleric", level: 1 },
    { label: "Tempest Domain", value: "Tempest Domain", char_class: "Cleric", level: 1 },
    { label: "Trickery Domain", value: "Trickery Domain", char_class: "Cleric", level: 1 },
    { label: "War Domain", value: "War Domain", char_class: "Cleric", level: 1 },
    { label: "Circle of the Land", value: "Circle of the Land", char_class: "Druid", level: 2},
    { label: "Circle of the Moon", value: "Circle of the Moon", char_class: "Druid", level: 2},
    { label: "Champion Archetype", value: "Champion Archetype", char_class: "Fighter", level: 3},
    { label: "Battle Master Archetype", value: "Battle Master Archetype", char_class: "Fighter", level: 3},
    { label: "Eldrich Knight Archetype", value: "Eldrich Knight Archetype", char_class: "Fighter", level: 3},
    { label: "Way of the Open Hand", value: "Way of the Open Hand", char_class: "Monk", level: 3},
    { label: "Way of Shadow", value: "Way of Shadow", char_class: "Monk", level: 3},
    { label: "Way of the Four Elements", value: "Way of the Four Elements", char_class: "Monk", level: 3},
    { label: "Oath of Devotion", value: "Oath of Devotion", char_class: "Paladin", level: 3},
    { label: "Oath of The Ancients", value: "Oath of The Ancients", char_class: "Paladin", level: 3},
    { label: "Oath of Vengeance", value: "Oath of Vengeance", char_class: "Paladin", level: 3},
    { label: "Hunter Archetype", value: "Hunter Archetype", char_class: "Ranger", level: 3},
    { label: "Beast Master Archetype", value: "Beast Master Archetype", char_class: "Ranger", level: 3},
    { label: "Thief Archetype", value: "Thief Archetype", char_class: "Rogue", level: 3},
    { label: "Assassin Archetype", value: "Assassin Archetype", char_class: "Rogue", level: 3},
    { label: "Arcane Trickster Archetype", value: "Arcane Trickster Archetype", char_class: "Rogue", level: 3},
    { label: "School of Abjuration", value: "School of Abjuration", char_class: "Wizard", level: 2 },
    { label: "School of Conjuration", value: "School of Conjuration", char_class: "Wizard", level: 2 },
    { label: "School of Divination", value: "School of Divination", char_class: "Wizard", level: 2 },
    { label: "School of Enchantment", value: "School of Enchantment", char_class: "Wizard", level: 2 },
    { label: "School of Evocation", value: "School of Evocation", char_class: "Wizard", level: 2 },
    { label: "School of Illusion", value: "School of Illusion", char_class: "Wizard", level: 2 },
    { label: "School of Necromancy", value: "School of Necromancy", char_class: "Wizard", level: 2 },
    { label: "School of Transmutation", value: "School of Transmutation", char_class: "Wizard", level: 2 }
  ]
  const [filtered_primary_class_features, setFilteredPrimaryClassFeatures] = useState([])
  const [primary_class_feature, setPrimaryClassFeature] = useState([])

  const SORCERER_ORIGINS = [
    { label: "Draconic Bloodline", value: "Draconic Bloodline" },
    { label: "Wild Magic", value: "Wild Magic" }
  ]
  const [sorcerer_origin, setSorcererOrigin] = useState([])

  const WARLOCK_PATRONS = [
    { label: "Archfey", value: "Archfey" },
    { label: "Fiend", value: "Fiend" },
    { label: "Old One", value: "Old One"}
  ]
  const [warlock_patron, setWarlockPatron] = useState([])

  const WARLOCK_PACT_BOONS = [
    {label: "Pact of the Chain", value: "Pact of the Chain"},
    {label: "Pact of the Blade", value: "Pact of the Blade"},
    {label: "Pact of the Tome", value: "Pact of the Tome"}
  ]
  const [warlock_pact_boon, setWarlockPactBoon] = useState([])

  const BARD_CANTRIPS = ["Blade Ward", "Dancing Lights", "Friends", "Light", "Mage Hand", "Mending", "Message", "Minor Illusion", "Prestidigitation", "True Strike", "Vicious Mockery"]
  const CLERIC_CANTRIPS = ["Guidance", "Light", "Mending", "Resistance", "Sacred Flame", "Spare the Dying", "Thaumaturgy"]
  const DRUID_CANTRIPS = ["Druidcraft", "Guidance", "Mending", "Poison Spray", "Produce Flame", "Resistance", "Shillelagh", "Thorn Whip"]
  const SORCERER_CANTRIPS = ["Acid Splash", "Blade Ward", "Chill Touch", "Dancing Lights", "Fire Bolt", "Friends", "Light", "Mage Hand", "Mending", "Message", "Minor Illusion", "Poison Spray", "Prestidigitation", "Ray of Frost", "Shocking Grasp", "True Strike"]
  const WARLOCK_CANTRIPS = ["Blade Ward", "Chill Touch", "Eldrich Blast", "Friends", "Mage Hand", "Minor Illusion", "Poison Spray", "Prestidigitation", "True Strike"]
  const WARLOCK_LVL1_SPELLS = ["Armor of Agathys", "Arms of Hadar", "Charm Person", "Comprehend Lnaguages", "Expeditious Retreat", "Hellish Rebuke", "Hex", "Illusory Script", "Protection from Evil and Good", "Unseen Servant", "Witch Bolt"]
  const WIZARD_CANTRIPS = ["Acid Splash", "Blade Ward", "Chill Touch", "Dancing Lights", "Fire Bolt", "Friends", "Light", "Mage Hand", "Mending", "Message", "Minor Illusion", "Poison Spray", "Prestidigitation", "Ray of Frost", "Shocking Grasp", "True Strike"]
  const getWarlockPactTomeCantrips = () => {
    return mergeArrays(BARD_CANTRIPS, CLERIC_CANTRIPS, DRUID_CANTRIPS, SORCERER_CANTRIPS, WARLOCK_CANTRIPS, WIZARD_CANTRIPS).map(c=>({label:c,value:c}))
  }
  function mergeArrays(...arrays) {
    let jointArray = []
    arrays.forEach(array => {
        jointArray = [...jointArray, ...array]
    })
    const uniqueArray = jointArray.filter((item,index) => jointArray.indexOf(item) === index)
    return uniqueArray.sort()
  }
  const [warlock_pact_tome_cantrips, setWarlockPactTomeCantrips] = useState([])

  const [acrobatics_dex, setAcrobaticsDex] = useState("")
  const [animal_handling_wis, setAnimalHandlingWis] = useState("")
  const [arcana_int, setArcanaInt] = useState("") 
  const [athletics_str, setAthleticsStr] = useState("")
  const [deception_cha, setDeceptionCha] = useState("")
  const [history_int, setHistoryInt] = useState("")
  const [insight_wis, setInstightWis] = useState("")
  const [intimidation_cha, setIntimidationCha] = useState("")
  const [investigation_int, setInvestigationInt] = useState("")
  const [medicine_wis, setMedicineWis] = useState("")
  const [nature_int, setNatureInt] = useState("")
  const [perception_wis, setPerceptionWis] = useState("")
  const [performance_cha, setPerformanceCha] = useState("")
  const [persuasion_cha, setPersuasionCha] = useState("")
  const [religion_int, setReligionInt] = useState("")
  const [sleight_of_hand_dex, setSlightOfHandDex] = useState("")
  const [stealth_dex, setStealthDex] = useState("")
  const [survival_wis, setSurvivalWis] = useState("")

  // example:  ABILITY_MODIFIER[15] = 2
  const ABILITY_MODIFIER = [
    null, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10
  ]

  // example: level 5 = +3
  const PROFICIENCY_BONUS = [
    null, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6
  ]

  const serializeData = () => {
    let character_data = {}
    DND5E_CONTROLS.forEach((control) => {
      character_data[control] = getCharacterProperty(control)
    })
    const json = JSON.stringify(character_data)
    return json
  }

  const saveData = async () => {
    const serialized_data = serializeData()
    const update_data = await API.graphql(
      graphqlOperation(createRecord, {
        input: {
          hash_key: hash_key,
          sort_key: sort_key,
          json: serialized_data
        }
      })
    )
  }

  const [level_up_modal, setLevelUpModal] = useState(false)
  const toggleLevelUpModal = () => setLevelUpModal(!level_up_modal)
  const levelUp = () => {
    // seed stats if this is the character's first level
    if (char_classes.length === 0) {
      setStrength(level_up_class.str)
      setDexterity(level_up_class.dex)
      setConstitution(level_up_class.con)
      setIntelligence(level_up_class.int)
      setWisdom(level_up_class.wis)
      setCharisma(level_up_class.cha)
    }

    let new_char_classes = [...char_classes]
    new_char_classes.push(level_up_class.value)
    setCharClasses(new_char_classes)    
    toggleLevelUpModal()
  }

  const levelDown = () => {
    const new_char_classes = [...char_classes]
    new_char_classes.pop()
    setCharClasses(new_char_classes)
    if (new_char_classes.length === 0) {
      toggleLevelUpModal()
    }
  }

  const navigateBack = () => {
    router.history.push('/characters')
  }

  const SheetSectionTitle = ({label}) => {
    return (
      <CardTitle className="round-bottom-right">
        <Row> 
          <Col className="title-text">
            &nbsp;{label}
          </Col>
          <Col />
          <Col />
        </Row>
      </CardTitle>
    )
  }

  const Barbarian = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Barbarian " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Bard = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Bard " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Cleric = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Cleric " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Druid = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Druid " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Fighter = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Fighter " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Monk = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Monk " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Paladin = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Paladin " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Ranger = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Ranger " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Rogue = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Rogue " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Sorcerer = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Sorcerer " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Warlock = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Warlock " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Wizard = ({level}) => {
    if (level < 1) return (<></>)
    return (
      <Card><SheetSectionTitle label={"Wizard " + level}/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const BackgroundDetails = ({current_background}) => {
    if (current_background.length === 0) { return (<></>) }
    return (
      <>
      <Row><Col><Select classNamePrefix="react-select" closeMenuOnSelect={false} components={animatedComponents} placeholder="Choose Personality Trait" options={filtered_personality_traits} onChange={(value) => { setPersonalityTrait(value) }} value={personality_trait}/></Col></Row>
      <Row><Col><Select classNamePrefix="react-select" closeMenuOnSelect={false} components={animatedComponents} placeholder="Choose Ideal" options={filtered_ideals} onChange={(value) => { setIdeal(value) }} value={ideal}/></Col></Row>
      <Row><Col><Select classNamePrefix="react-select" closeMenuOnSelect={false} components={animatedComponents} placeholder="Choose Bond" options={filtered_bonds} onChange={(value) => { setBond(value) }} value={bond}/></Col></Row>
      <Row><Col><Select classNamePrefix="react-select" closeMenuOnSelect={false} components={animatedComponents} placeholder="Choose Flaw" options={filtered_flaws} onChange={(value) => { setFlaw(value) }} value={flaw}/></Col></Row>   
      </>
    )
  }

  const Bio = ({current_char_classes}) => {
    if (current_char_classes.length === 0) { return (<></>) }
    return (
      <Card><SheetSectionTitle label="Bio"/>
        <CardBody>
          <Row>
            <Col><Select classNamePrefix="react-select" closeMenuOnSelect={false} components={animatedComponents} placeholder="Choose Race" options={RACES} onChange={(value) => { setRace(value) }} value={race}/></Col>
            <Col><Select classNamePrefix="react-select" closeMenuOnSelect={false} components={animatedComponents} placeholder="Choose Alignment" options={ALIGNMENTS} onChange={(value) => { setAlignment(value) }} value={alignment} /></Col>
          </Row>
          <Row>
            <Col><Select classNamePrefix="react-select" closeMenuOnSelect={false} components={animatedComponents} placeholder="Choose Background" options={BACKGROUNDS} onChange={(value) => { setBackground(value) }} value={background}/></Col>
            <Col><Select classNamePrefix="react-select" closeMenuOnSelect={false} components={animatedComponents} placeholder="Choose Pronoun" options={PRONOUNS} onChange={(value) => { setPronoun(value) }} value={pronoun}/></Col>
          </Row>
          <BackgroundDetails current_background={background}/>
        </CardBody>
      </Card>
    )
  }

  const Spells = ({current_char_classes}) => {
    if (current_char_classes.length === 0) { return (<></>) }
    return (
      <Card><SheetSectionTitle label="Spells"/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Equipment = ({current_char_classes}) => {
    if (current_char_classes.length === 0) { return (<></>) }
    return (
      <Card><SheetSectionTitle label="Equipment"/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const hasCreationPoints = ({stat, new_value}) => {
    let sum = 27;
    switch (stat) {
      case "Strength": sum -= sumCreationPoints([new_value, dexterity, constitution, intelligence, wisdom, charisma]); break;
      case "Dexterity": sum -= sumCreationPoints([strength, new_value, constitution, intelligence, wisdom, charisma]); break;
      case "Constitution": sum -= sumCreationPoints([strength, dexterity, new_value, intelligence, wisdom, charisma]); break;
      case "Intelligence": sum -= sumCreationPoints([strength, dexterity, constitution, new_value, wisdom, charisma]); break;
      case "Wisdom": sum -= sumCreationPoints([strength, dexterity, constitution, intelligence, new_value, charisma]); break;
      case "Charisma": sum -= sumCreationPoints([strength, dexterity, constitution, intelligence, wisdom, new_value]); break;
      default: break;
    }
    return (sum >= 0)
  }

  const sumCreationPoints = (stats) => {
    let counter = 0
    stats.forEach( stat => {
      if (stat === 15) { 
        counter += 9
      } else if (stat === 14) {
        counter += 7
      } else {
        counter += (stat - 8)
      }
    })
    return counter
  }

  const adjustBaseStat = ({stat, delta}) => {
    let new_value = 0
    switch (stat) {
      case "Strength": 
        new_value = strength + delta
        if (new_value > 7 && new_value < 16 && hasCreationPoints({stat: stat, new_value: new_value})) { setStrength(new_value) }
        break
      case "Dexterity": 
        new_value = dexterity + delta
        if (new_value > 7 && new_value < 16 && hasCreationPoints({stat: stat, new_value: new_value})) { setDexterity(new_value) }
        break  
      case "Constitution": 
        new_value = constitution + delta
        if (new_value > 7 && new_value < 16 && hasCreationPoints({stat: stat, new_value: new_value})) { setConstitution(new_value) }
        break 
      case "Intelligence": 
        new_value = intelligence + delta
        if (new_value > 7 && new_value < 16 && hasCreationPoints({stat: stat, new_value: new_value})) { setIntelligence(new_value) }
        break 
      case "Wisdom": 
        new_value = wisdom + delta
        if (new_value > 7 && new_value < 16 && hasCreationPoints({stat: stat, new_value: new_value})) { setWisdom(new_value) }
        break 
      case "Charisma": 
        new_value = charisma + delta
        if (new_value > 7 && new_value < 16 && hasCreationPoints({stat: stat, new_value: new_value})) { setCharisma(new_value) }
        break 
      default: break; 
    }
  }

  const Stats = ({current_char_classes, current_race}) => {
    if (current_race.length === 0 || current_char_classes.length === 0) { return (<></>) }
    return (
      <Card><SheetSectionTitle label=" Stats"/>
        <CardBody>
          <Row noGutters={true}>
            <Col xs={4}></Col>
            <Col xs={4}>Base</Col>
            <Col xs={4}>Modified</Col>
          </Row>
          <Row noGutters={true}>
            <Col xs={4}>Strength</Col>
            <Col xs={1}>{strength}</Col>
            <Col xs={3}>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Strength",delta:1})}}><i className="tim-icons tim-icons-16 icon-simple-add"/></Button>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Strength",delta:(-1)})}}><i className="tim-icons tim-icons-16 icon-simple-delete"/></Button>
            </Col>
            <Col xs={4}>{strength + current_race.str}</Col>
          </Row>
          <Row noGutters={true}>
            <Col xs={4}>Dexterity</Col>
            <Col xs={1}>{dexterity}</Col>
            <Col xs={3}>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Dexterity",delta:1})}}><i className="tim-icons tim-icons-16 icon-simple-add"/></Button>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Dexterity",delta:(-1)})}}><i className="tim-icons tim-icons-16 icon-simple-delete"/></Button>
            </Col>
            <Col xs={4}>{dexterity + current_race.dex}</Col>
          </Row>
          <Row noGutters={true}>
            <Col xs={4}>Constitution</Col>
            <Col xs={1}>{constitution}</Col>
            <Col xs={3}>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Constitution",delta:1})}}><i className="tim-icons tim-icons-16 icon-simple-add"/></Button>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Constitution",delta:(-1)})}}><i className="tim-icons tim-icons-16 icon-simple-delete"/></Button>
            </Col>
            <Col xs={4}>{constitution + current_race.con}</Col>
          </Row>
          <Row noGutters={true}>
            <Col xs={4}>Intelligence</Col>
            <Col xs={1}>{intelligence}</Col>
            <Col xs={3}>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Intelligence",delta:1})}}><i className="tim-icons tim-icons-16 icon-simple-add"/></Button>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Intelligence",delta:(-1)})}}><i className="tim-icons tim-icons-16 icon-simple-delete"/></Button>
            </Col>
            <Col xs={4}>{intelligence + current_race.int}</Col>
          </Row>
          <Row noGutters={true}>
            <Col xs={4}>Wisdom</Col>
            <Col xs={1}>{wisdom}</Col>
            <Col xs={3}>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Wisdom",delta:1})}}><i className="tim-icons tim-icons-16 icon-simple-add"/></Button>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Wisdom",delta:(-1)})}}><i className="tim-icons tim-icons-16 icon-simple-delete"/></Button>
            </Col>
            <Col xs={4}>{wisdom + current_race.wis}</Col>
          </Row>
          <Row noGutters={true}>
            <Col xs={4}>Charisma</Col>
            <Col xs={1}>{charisma}</Col>
            <Col xs={3}>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Charisma",delta:1})}}><i className="tim-icons tim-icons-16 icon-simple-add"/></Button>
              <Button type="button" className="btn btn-primary btn-sm" onClick={()=>{adjustBaseStat({stat:"Charisma",delta:(-1)})}}><i className="tim-icons tim-icons-16 icon-simple-delete"/></Button>
            </Col>
            <Col xs={4}>{charisma + current_race.cha}</Col>
          </Row>
          <Row noGutters={true}>
            <Col xs={4}>Points</Col>
            <Col xs={8}>{27 - sumCreationPoints([strength, dexterity, constitution, intelligence, wisdom, charisma])}</Col>
          </Row>
        </CardBody>
      </Card>
    )
  }

  const Rolls = ({current_char_classes}) => {
    if (current_char_classes.length === 0) { return (<></>) }
    return (
      <Card><SheetSectionTitle label="Rolls"/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  const Capabilities = ({current_char_classes}) => {
    if (current_char_classes.length === 0) { return (<></>) }
    return (
      <Card><SheetSectionTitle label="Capabilities"/>
        <CardBody>
          BODY
        </CardBody>
      </Card>
    )
  }

  return (
    <>
      <ColorNavbar page="Character"/>
        <Col>
            <Card className="card-character">
              <CardHeader>                  
                <CardTitle tag="h4">
                  <Row> 
                    <Col className="char-name">
                      &nbsp;{queryString.parse(router.location.search).name}
                    </Col>
                    <Col className="text-center">
                      <Button type="button" className="btn btn-primary btn-md" onClick={saveData}>
                        <i className="tim-icons tim-icons-16 icon-key-25"></i> Save
                      </Button>
                      <Button type="button" className="btn btn-primary btn-md" onClick={toggleLevelUpModal}>
                        <i className="tim-icons tim-icons-16 icon-simple-add"></i> Level
                      </Button>
                      <Modal isOpen={level_up_modal}  tabIndex="1" toggle={toggleLevelUpModal}>
                        <Form>
                          <ModalHeader toggle={toggleLevelUpModal}>CHOOSE YOUR NEXT CLASS LEVEL</ModalHeader>
                          <ModalBody>
                          <FormGroup className="card-input-group-characters">
                            <Label>Class</Label>
                            <Select
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              options={CLASSES}
                              onChange={(value) => { setLevelUpClass(value) }}
                              value={level_up_class}
                            />
                          </FormGroup>       
                          </ModalBody>
                          <ModalFooter>
                            <Button color="secondary" onClick={ toggleLevelUpModal }>Cancel</Button>
                            <Button color="primary" onClick={ levelUp }>Save</Button>
                          </ModalFooter>
                        </Form>
                      </Modal> 
                      <Button type="button" className="btn btn-primary btn-md" onClick={levelDown}>
                        <i className="tim-icons tim-icons-16 icon-simple-delete"></i> Level
                      </Button>
                      <Button type="button" className="btn btn-primary btn-md" onClick={navigateBack}>
                        <i className="tim-icons tim-icons-16 icon-double-left"></i> Back
                      </Button>
                    </Col>
                  </Row>
                </CardTitle>
              </CardHeader>
              <CardBody>
              <form>
                <Row> 
                  <Col>
                    <Bio current_char_classes={char_classes}/>
                    <Barbarian level={barbarian_level}/>
                    <Bard level={bard_level}/>
                    <Cleric level={cleric_level}/>
                    <Druid level={druid_level}/>
                    <Fighter level={fighter_level}/>
                    <Monk level={monk_level}/>
                    <Paladin level={paladin_level}/>
                    <Ranger level={ranger_level}/>
                    <Rogue level={rogue_level}/>
                    <Sorcerer level={sorcerer_level}/>
                    <Warlock level={warlock_level}/>
                    <Wizard level={wizard_level}/>
                    <Spells current_char_classes={char_classes}/>
                    <Equipment current_char_classes={char_classes}/>
                    <Stats current_char_classes={char_classes} current_race={race}/>
                  </Col> 
                  <Col>
                    <Rolls current_char_classes={char_classes}/>
                    <Capabilities current_char_classes={char_classes}/>
                  </Col>
                </Row>
                </form>
              </CardBody>     
            </Card>
            </Col>
      <DemoFooter />
    </>
  );
}

export default DND5ECharacter;