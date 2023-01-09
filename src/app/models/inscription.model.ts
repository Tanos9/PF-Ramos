export class Inscription {
    constructor(
        public id: number,
        public studentId: number,
        public courseId: number,
    ) {}
}

export class InscriptionData {
    constructor(
        public inscriptionId: number,
        public studentName: string,
        public courseName: string,
    ) {}
}
