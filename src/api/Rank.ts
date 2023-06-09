export enum ArmyRank {
    RECRUITE = 'Рекрут',
    SOLDIER = 'Солдат',
    SENIOR_SOLDIER = 'Старший солдат',

    JUNIOR_SERGEANT = 'Молодший сержант',
    SERGEANT = 'Сержант',

    SENIOR_SERGEANT = 'Старший сержант',
    MAIN_SERGEANT = 'Головний сержант',
    STAFF_SERGEANT = 'Штаб-сержант',

    MASTER_SERGEANT = 'Майстер-сержант',
    SENIOR_MASTER_SERGEANT = 'Старший майстер-сержант',
    PRIMARY_MASTER_SERGEANT = 'Головний майстер-сержант',

    JUNIOR_LIEUTENANT = 'Молодший лейтенант', 
    LIEUTENANT = 'Лейтенант',
    SENIOR_LIEUTENANT = 'Старший лейтенант', 
    CAPTAIN = 'Капітан',

    MAJOR = 'Майор',
    LIEUTENANT_COLONEL = 'Підполковник',
    COLONEL = 'Полковник',

    BRIGADIER_GENERAL = 'Бригадний генерал',
    GENERAL_MAJOR = 'Генерал-майор',
    GENERAL_LIEUTENANT = 'Генерал-лейтенант',
    GENERAL = 'Генерал'
}

export enum ShipRank {
    RECRUITE = 'Рекрут',
    
    SAILOR = 'Матрос',
    SENIOR_SAILOR = 'Старший матрос',
    
    SECOND_PETTY = 'Старшина 2 статті',
    FIRST_PETTY = 'Старшина 1 статті',

    MAIN_PETTY = 'Головний старшина',
    MAIN_SHIP_PETTY = 'Головний корабельний старшина',
    STAFF_PETTY = 'Штаб-старшина',

    MASTER_PETTY = 'Майстер-старшина',
    SENIOR_MASTER_PETTY = 'Старший майстер-старшина',
    PRIMARY_MASTER_PETTY = 'Головний майстер-старшина',

    JUNIOR_LIEUTENANT = 'Молодший лейтенант', 
    LIEUTENANT = 'Лейтенант',
    SENIOR_LIEUTENANT = 'Старший лейтенант', 
    LIEUTENANT_CAPTAIN = 'Капітан-лейтенант',

    THIRD_RANK_CAPTAIN = 'Капітан 3 рангу',
    SECOND_RANK_CAPTAIN = 'Капітан 2 рангу',
    FIRST_RANK_CAPTAIN = 'Капітан 1 рангу',
    
    COMMODORE = 'Коммодор',
    REAR_ADMIRAL = 'Контрадмірал',
    VICE_ADMIRAL = 'Віцеадмірал',
    ADMIRAL = 'Адмірал'
}

export type Rank = ArmyRank | ShipRank;
