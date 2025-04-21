import { AppointmentService } from './appointment.service';
import { Request } from 'express';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    getMyAppointments(req: Request): Promise<import("./appointment.entity").Appointment[]>;
    createAppointment(req: Request, data: any): Promise<import("./appointment.entity").Appointment>;
    updateAppointment(req: Request, id: string, data: any): Promise<import("./appointment.entity").Appointment | null>;
    deleteAppointment(req: Request, id: string): Promise<true | null>;
}
